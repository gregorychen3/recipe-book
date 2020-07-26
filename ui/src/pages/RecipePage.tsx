import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { selectRecipe } from "../features/recipe/RecipeSlice";
import ActionMenu from "../components/ActionMenu";
import { Typography } from "@material-ui/core";

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
    <>
      <ActionMenu
        onDelete={handleDeleteClicked}
        onEdit={isEditing ? undefined : handleEditClicked}
        onSave={isEditing ? handleSaveClicked : undefined}
      />
      <Typography variant="h6">{recipe.name.toUpperCase()}</Typography>
    </>
  );
}
