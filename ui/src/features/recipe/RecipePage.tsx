import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getApiClient } from "../api/apiClient";
import { useTokenFn } from "../api/useTokenFn";
import { DeleteRecipeDialog } from "./DeleteRecipeDialog";
import { Recipe } from "./Recipe";
import { RecipeHeader } from "./RecipeHeader";
import { putRecipe, selectRecipe } from "./recipeSlice";

export function RecipePage() {
  const d = useAppDispatch();
  const nav = useNavigate();
  const tokenFn = useTokenFn();

  const [deleteDialogData, setDeleteDialogData] = useState<string | undefined>(
    undefined
  );

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

  if (!recipe) {
    return null;
  }

  const handleShowDeleteDialog = () => setDeleteDialogData(recipe.id);
  const handleCloseDeleteDialog = () => setDeleteDialogData(undefined);
  const handleEditClicked = () => nav(`/recipes/${recipeId}/edit`);

  return (
    <>
      <DeleteRecipeDialog
        recipeId={deleteDialogData}
        onClose={handleCloseDeleteDialog}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RecipeHeader
            title={recipe.name}
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
