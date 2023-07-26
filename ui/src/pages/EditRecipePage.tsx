import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Recipe } from "../../../src/recipe";
import { RecipeForm } from "../features/recipe/RecipeForm";
import { RecipeHeader } from "../features/recipe/RecipeHeader";
import { putRecipe, selectRecipe } from "../features/recipe/recipeSlice";
import { getApiClient, useTokenFn } from "../features/api/apiClient";

export function EditRecipePage() {
  const d = useDispatch();
  const nav = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const tokenFn = useTokenFn();

  const [headerText, setHeaderText] = useState("");

  const params = useParams<{ recipeId: string }>();
  const recipeId = params.recipeId!;
  const recipe = useSelector(selectRecipe(recipeId));

  useEffect(() => {
    tokenFn().then((token) =>
      getApiClient({ token })
        .getRecipe(recipeId)
        .then((r) => d(putRecipe(r)))
    );
  }, [d, recipeId, tokenFn]);

  useEffect(() => {
    setHeaderText(recipe?.name ?? "");
  }, [recipe]);

  if (!recipe) {
    return null;
  }

  const handleSubmit = (recipe: Recipe) => {
    tokenFn().then((token) =>
      getApiClient({ token })
        .updateRecipe(recipe)
        .then((r) => {
          d(putRecipe(r));
          nav(`/recipes/${r.id}`);
          enqueueSnackbar(`Successfully updated recipe ${r.name}`, {
            variant: "success",
          });
        })
    );
  };

  const handleRecipeEdited = (recipe: Recipe) => setHeaderText(recipe.name);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RecipeHeader title={headerText} />
      </Grid>
      <Grid item xs={12}>
        <RecipeForm
          recipe={recipe}
          onChange={handleRecipeEdited}
          onSubmit={handleSubmit}
        />
      </Grid>
    </Grid>
  );
}
