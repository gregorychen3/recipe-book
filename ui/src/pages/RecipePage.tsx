import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { selectRecipe } from "../features/recipe/RecipeSlice";
import ActionMenu from "../components/ActionMenu";

export default function RecipePage() {
  const [isEditing, setIsEditing] = useState(false);

  const { recipeId } = useParams();
  const recipe = useSelector(selectRecipe(recipeId));
  if (!recipe) {
    return <Redirect to="/recipes" />;
  }

  const handleDeleteClicked = () => {};

  const handleEditClicked = () => {
    setIsEditing(true);
  };

  const handleSaveClicked = () => {
    setIsEditing(false);
  };

  return (
    <ActionMenu
      onDelete={handleDeleteClicked}
      onEdit={isEditing ? undefined : handleEditClicked}
      onSave={isEditing ? handleSaveClicked : undefined}
    />
  );
}
