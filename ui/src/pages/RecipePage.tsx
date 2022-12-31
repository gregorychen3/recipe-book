import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IRecipeModel } from "../../../src/db/recipe";
import { useApi } from "../app/hooks";
import { DeleteRecipeDialog } from "../features/recipe/DeleteRecipeDialog";
import { Recipe } from "../features/recipe/Recipe";
import { RecipeHeader } from "../features/recipe/RecipeHeader";
import { putRecipe, selectRecipe } from "../features/recipe/recipeSlice";

export function RecipePage() {
  const d = useDispatch();
  const h = useHistory();

  const [deleteDialogData, setDeleteDialogData] = useState<string | undefined>(undefined);

  const { recipeId } = useParams<{ recipeId: string }>();
  const recipe = useSelector(selectRecipe(recipeId));

  const getRecipe = useApi<IRecipeModel>("GET", `/api/recipes/${recipeId}`);
  useEffect(() => {
    const [call] = getRecipe();
    call.then((resp) => d(putRecipe(resp.data)));
  }, [getRecipe, d]);

  if (!recipe) {
    return null;
  }

  const handleShowDeleteDialog = () => setDeleteDialogData(recipe.id);
  const handleCloseDeleteDialog = () => setDeleteDialogData(undefined);
  const handleEditClicked = () => h.push(`/recipes/${recipeId}/edit`);

  return (
    <>
      <DeleteRecipeDialog recipeId={deleteDialogData} onClose={handleCloseDeleteDialog} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RecipeHeader
            title={recipe.name.toUpperCase()}
            onDelete={handleShowDeleteDialog}
            onEdit={handleEditClicked}
            disableSave
          />
        </Grid>
        <Grid item xs={12}>
          <Recipe recipe={recipe} />
        </Grid>
      </Grid>
    </>
  );
}
