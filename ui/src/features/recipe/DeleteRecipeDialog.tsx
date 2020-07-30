import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React from "react";

export interface DeleteRecipeDialogProps {
  recipeId?: string;
  onClose: () => void;
}
export default function DeleteRecipeDialog({ recipeId, onClose }: DeleteRecipeDialogProps) {
  return (
    <Dialog open={!!recipeId} onClose={onClose}>
      <DialogTitle>Delete Recipe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
        <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
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
