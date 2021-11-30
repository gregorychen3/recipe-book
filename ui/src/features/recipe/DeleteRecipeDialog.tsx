import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { removeRecipe, selectRecipe } from "../../features/recipe/RecipeSlice";

export interface DeleteRecipeDialogProps {
  recipeId?: string;
  onClose: () => void;
}
export default function DeleteRecipeDialog({ recipeId, onClose }: DeleteRecipeDialogProps) {
  const d = useDispatch();
  const h = useHistory();
  const recipe = useSelector(selectRecipe(recipeId ?? ""));
  const recipeName = recipe ? recipe.name : "";

  const deleteRecipe = useApi<{ id: string }>("DELETE", `/api/recipes/${recipeId}`);
  const handleDelete = () => {
    if (!recipeId) {
      return;
    }

    const [call] = deleteRecipe();
    call.then((resp) => d(removeRecipe(resp.data.id)));
    onClose();
    h.push("/recipes");
  };

  return (
    <Dialog open={!!recipeId} onClose={onClose}>
      <DialogTitle>Confirm Delete Recipe</DialogTitle>
      <DialogContent>
        <DialogContentText>The recipe will be permanently deleted.</DialogContentText>
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
