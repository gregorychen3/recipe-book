import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../../src/recipe";
import { useApi } from "../app/hooks";
import { RecipeForm } from "../features/recipe/RecipeForm";
import { RecipeHeader } from "../features/recipe/RecipeHeader";
import { putRecipe } from "../features/recipe/recipeSlice";

export function CreateRecipePage() {
  const d = useDispatch();
  const nav = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [headerText, setHeaderText] = useState("");

  const handleRecipeEdited = (recipe: Recipe) => setHeaderText(recipe.name);

  const createRecipe = useApi<Recipe>("POST", `/api/recipes`);
  const handleSubmit = (recipe: Recipe) => {
    const [call] = createRecipe(recipe);
    call.then((resp) => {
      enqueueSnackbar(`Successfully created recipe ${resp.data.name}`, {
        variant: "success",
      });
      d(putRecipe(resp.data));
      nav(`/recipes/${resp.data.id}`);
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RecipeHeader title={headerText} />
      </Grid>
      <Grid item xs={12}>
        <RecipeForm onChange={handleRecipeEdited} onSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
}
