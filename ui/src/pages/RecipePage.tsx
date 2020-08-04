import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { IRecipe } from "../../../src/types";
import DeleteRecipeDialog from "../features/recipe/DeleteRecipeDialog";
import Recipe from "../features/recipe/Recipe";
import RecipeForm from "../features/recipe/RecipeForm";
import RecipeHeader from "../features/recipe/RecipeHeader";
import { selectRecipe, updateRecipe } from "../features/recipe/RecipeSlice";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(2),
  },
  metadataRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  hidden: { visibility: "hidden" },
}));

export default function RecipePage() {
  const classes = useStyles();
  const d = useDispatch();

  const [deleteDialogData, setDeleteDialogData] = useState<string | undefined>(undefined);

  const [isEditing, setIsEditing] = useState(false);

  const { recipeId } = useParams();
  const recipe = useSelector(selectRecipe(recipeId));
  if (!recipe) {
    return <Redirect to="/recipes" />;
  }

  const handleShowDeleteDialog = () => setDeleteDialogData(recipe.id);
  const handleCloseDeleteDialog = () => {
    setDeleteDialogData(undefined);
  };

  const handleEditClicked = () => {
    setIsEditing(true);
  };

  const handleSubmit = (recipe: IRecipe) => {
    d(updateRecipe({ recipeId, recipe }));

    setIsEditing(false);
  };

  return (
    <>
      <DeleteRecipeDialog recipeId={deleteDialogData} onClose={handleCloseDeleteDialog} />
      <RecipeHeader
        title={recipe.name.toUpperCase()}
        onDelete={handleShowDeleteDialog}
        onEdit={handleEditClicked}
        disableSave={!isEditing}
      />
      {isEditing ? <RecipeForm recipe={recipe} onSubmit={handleSubmit} /> : <Recipe recipe={recipe} />}
    </>
  );
}
