import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../../../src/recipe";
import { RecipeForm } from "../features/recipe/RecipeForm";
import { RecipeHeader } from "../features/recipe/RecipeHeader";
import { putRecipe } from "../features/recipe/recipeSlice";
import { getApiClient, useTokenFn } from "../useApiClient";

export function CreateRecipePage() {
  const d = useDispatch();
  const nav = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const tokenFn = useTokenFn();

  const [headerText, setHeaderText] = useState("");

  const handleRecipeEdited = (recipe: Recipe) => setHeaderText(recipe.name);

  const handleSubmit = (recipe: Recipe) => {
    tokenFn().then((token) =>
      getApiClient({ token })
        .createRecipe(recipe)
        .then((r) => {
          d(putRecipe(r));
          nav(`/recipes/${r.id}`);
          enqueueSnackbar(`Successfully created recipe ${r.name}`, {
            variant: "success",
          });
        })
    );
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
