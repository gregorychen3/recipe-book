import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { IRecipe } from "../../../src/types";
import DeleteRecipeDialog from "../features/recipe/DeleteRecipeDialog";
import Recipe from "../features/recipe/Recipe";
import RecipeForm from "../features/recipe/RecipeForm";
import RecipeHeader from "../features/recipe/RecipeHeader";
import { selectRecipe, updateRecipe, fetchRecipe } from "../features/recipe/RecipeSlice";

export default function RecipePage() {
  const d = useDispatch();

  const [deleteDialogData, setDeleteDialogData] = useState<string | undefined>(undefined);

  const [isEditing, setIsEditing] = useState(false);
  const [headerText, setHeaderText] = useState("");

  const { recipeId } = useParams();
  const recipe = useSelector(selectRecipe(recipeId));

  useEffect(() => {
    !recipe && d(fetchRecipe(recipeId));
  }, [recipe, recipeId, d]);

  useEffect(() => {
    setHeaderText(recipe?.name.toUpperCase() ?? "");
  }, [recipe]);

  if (!recipe) {
    return null;
  }

  const handleShowDeleteDialog = () => setDeleteDialogData(recipe.id);
  const handleCloseDeleteDialog = () => setDeleteDialogData(undefined);

  const handleEditClicked = () => setIsEditing(true);

  const handleSubmit = (recipe: IRecipe) => {
    d(updateRecipe({ recipeId, recipe }));
    setIsEditing(false);
  };

  const handleRecipeEdited = (recipe: IRecipe) => setHeaderText(recipe.name);

  return (
    <>
      <DeleteRecipeDialog recipeId={deleteDialogData} onClose={handleCloseDeleteDialog} />
      <RecipeHeader
        title={headerText}
        onDelete={handleShowDeleteDialog}
        onEdit={handleEditClicked}
        disableSave={!isEditing}
      />
      {isEditing ? (
        <RecipeForm recipe={recipe} onChange={handleRecipeEdited} onSubmit={handleSubmit} />
      ) : (
        <Recipe recipe={recipe} />
      )}
    </>
  );
}
