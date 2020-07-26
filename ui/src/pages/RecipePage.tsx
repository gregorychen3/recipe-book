import { ButtonGroup } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { selectRecipe } from "../features/recipe/RecipeSlice";

interface Props {
  onDelete: () => void;
  onEdit?: () => void;
  onSave?: () => void;
}
const ActionMenu = ({ onDelete, onEdit, onSave }: Props) => {
  return (
    <ButtonGroup variant="text" color="primary">
      <IconButton size="small" onClick={onDelete}>
        <DeleteOutlineIcon fontSize="small" color="error" />
      </IconButton>
      {onSave && (
        <IconButton size="small" onClick={onSave}>
          <SaveIcon fontSize="small" />
        </IconButton>
      )}
      {onEdit && (
        <IconButton size="small" onClick={onEdit}>
          <EditIcon fontSize="small" />
        </IconButton>
      )}
    </ButtonGroup>
  );
};

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
