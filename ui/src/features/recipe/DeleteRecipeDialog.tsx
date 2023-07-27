import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeRecipe, selectRecipe } from "../../features/recipe/recipeSlice";
import { getApiClient } from "../api/apiClient";
import { useTokenFn } from "../api/useTokenFn";

interface DeleteRecipeDialogProps {
  recipeId?: string;
  onClose: () => void;
}
export function DeleteRecipeDialog({
  recipeId,
  onClose,
}: DeleteRecipeDialogProps) {
  const d = useAppDispatch();
  const nav = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const tokenFn = useTokenFn();

  const recipe = useAppSelector(selectRecipe(recipeId ?? ""));
  const recipeName = recipe ? recipe.name : "";

  const handleDelete = () => {
    if (!recipeId) {
      return;
    }

    tokenFn().then((token) =>
      getApiClient({ token })
        .deleteRecipe(recipeId)
        .then((id) => {
          enqueueSnackbar(`Successfully deleted recipe ${id}`, {
            variant: "success",
          });
          d(removeRecipe(id));
          onClose();
          nav("/recipes");
        })
    );
  };

  return (
    <Dialog open={!!recipeId} onClose={onClose}>
      <DialogTitle>Confirm Delete Recipe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The recipe will be permanently deleted.
        </DialogContentText>
        <TextField
          disabled
          margin="dense"
          label="Recipe Name"
          type="text"
          fullWidth
          value={recipeName}
        />
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
