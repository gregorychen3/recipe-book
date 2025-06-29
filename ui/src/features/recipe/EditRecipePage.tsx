import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Recipe } from "../../../../src/recipe";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getApiClient } from "../api/apiClient";
import { useTokenFn } from "../api/useTokenFn";
import { RecipeForm } from "./RecipeForm";
import { RecipeHeader } from "./RecipeHeader";
import { putRecipe, selectRecipe } from "./recipeSlice";

export function EditRecipePage() {
  const d = useAppDispatch();
  const nav = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const tokenFn = useTokenFn();

  const [headerText, setHeaderText] = useState("");

  const params = useParams<{ recipeId: string }>();
  const recipeId = params.recipeId!;
  const recipe = useAppSelector(selectRecipe(recipeId));

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
