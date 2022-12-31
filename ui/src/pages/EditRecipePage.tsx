import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IRecipeModel } from "../../../src/db/recipe";
import { IRecipe } from "../../../src/types";
import { useApi } from "../app/hooks";
import { RecipeForm } from "../features/recipe/RecipeForm";
import { RecipeHeader } from "../features/recipe/RecipeHeader";
import { putRecipe, selectRecipe } from "../features/recipe/recipeSlice";

export function EditRecipePage() {
  const d = useDispatch();
  const h = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [headerText, setHeaderText] = useState("");

  const { recipeId } = useParams<{ recipeId: string }>();
  const recipe = useSelector(selectRecipe(recipeId));

  const getRecipe = useApi<IRecipeModel>("GET", `/api/recipes/${recipeId}`);
  const updateRecipe = useApi<IRecipeModel>("POST", `/api/recipes/${recipeId}`);

  useEffect(() => {
    const [call] = getRecipe();
    call.then((resp) => d(putRecipe(resp.data)));
  }, [getRecipe, d]);

  useEffect(() => {
    setHeaderText(recipe?.name.toUpperCase() ?? "");
  }, [recipe]);

  if (!recipe) {
    return null;
  }

  const handleSubmit = (recipe: IRecipe) => {
    const [call] = updateRecipe(recipe);
    call.then((resp) => {
      enqueueSnackbar(`Successfully updated recipe ${resp.data.name}`, { variant: "success" });
      d(putRecipe(resp.data));
      h.push(`/recipes/${recipeId}`);
    });
  };

  const handleRecipeEdited = (recipe: IRecipe) => setHeaderText(recipe.name);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RecipeHeader title={headerText} />
      </Grid>
      <Grid item xs={12}>
        <RecipeForm recipe={recipe} onChange={handleRecipeEdited} onSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
}
