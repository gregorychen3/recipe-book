import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useSelector } from "react-redux";
import { selectRecipe } from "./RecipeSlice";

export interface DeleteRecipeDialogProps {
  recipeId?: string;
  onClose: () => void;
}
export default function DeleteRecipeDialog({ recipeId, onClose }: DeleteRecipeDialogProps) {
  const recipe = useSelector(selectRecipe(recipeId ?? ""));
  const recipeName = recipe ? recipe.name : "";

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
        <Button onClick={onClose} color="primary">
          <Box color="error.main">Delete</Box>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
