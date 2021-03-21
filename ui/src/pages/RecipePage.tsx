import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import DeleteRecipeDialog from "../features/recipe/DeleteRecipeDialog";
import Recipe from "../features/recipe/Recipe";
import RecipeHeader from "../features/recipe/RecipeHeader";
import { fetchRecipe, selectRecipe } from "../features/recipe/RecipeSlice";

export default function RecipePage() {
  const d = useDispatch();
  const history = useHistory();

  const [deleteDialogData, setDeleteDialogData] = useState<string | undefined>(undefined);

  const { recipeId } = useParams<{ recipeId: string }>();
  const recipe = useSelector(selectRecipe(recipeId));

  useEffect(() => {
    !recipe && d(fetchRecipe(recipeId));
  }, [recipe, recipeId, d]);

  if (!recipe) {
    return null;
  }

  const handleShowDeleteDialog = () => setDeleteDialogData(recipe.id);
  const handleCloseDeleteDialog = () => setDeleteDialogData(undefined);
  const handleEditClicked = () => history.push(`/recipes/${recipeId}/edit`);

  return (
    <>
      <DeleteRecipeDialog recipeId={deleteDialogData} onClose={handleCloseDeleteDialog} />
      <RecipeHeader
        title={recipe.name.toUpperCase()}
        onDelete={handleShowDeleteDialog}
        onEdit={handleEditClicked}
        disableSave
      />
      <Recipe recipe={recipe} />
    </>
  );
}
