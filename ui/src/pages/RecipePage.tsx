import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import ActionMenu from "../components/ActionMenu";
import { selectRecipe } from "../features/recipe/RecipeSlice";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  hidden: { visibility: "hidden" },
}));

export default function RecipePage() {
  const classes = useStyles();

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
      <div className={classes.header}>
        <ActionMenu onDelete={() => {}} className={classes.hidden} />
        <Typography variant="h6">{recipe.name.toUpperCase()}</Typography>
        <ActionMenu
          onDelete={handleDeleteClicked}
          onEdit={isEditing ? undefined : handleEditClicked}
          onSave={isEditing ? handleSaveClicked : undefined}
        />
      </div>
    </>
  );
}
