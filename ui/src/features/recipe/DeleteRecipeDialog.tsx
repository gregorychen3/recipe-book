import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteRecipe, selectRecipe } from "./RecipeSlice";

export interface DeleteRecipeDialogProps {
  recipeId?: string;
  onClose: () => void;
}
export default function DeleteRecipeDialog({ recipeId, onClose }: DeleteRecipeDialogProps) {
  const history = useHistory();
  const recipe = useSelector(selectRecipe(recipeId ?? ""));
  const recipeName = recipe ? recipe.name : "";

  const d = useDispatch();
  const handleDelete = () => {
    if (!recipeId) {
      return;
    }
    d(deleteRecipe({ recipeId, history }));
    onClose();
    history.push("/recipes");
  };

  return (
    <Dialog open={!!recipeId} onClose={onClose}>
      <DialogTitle>Confirm Delete Recipe</DialogTitle>
      <DialogContent>
        <DialogContentText>This will permanently delete the recipe.</DialogContentText>
        <TextField disabled margin="dense" label="Recipe Name" type="text" fullWidth value={recipeName} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          <Box color="error.main">Delete</Box>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
