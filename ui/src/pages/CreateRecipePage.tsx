import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { IRecipeModel } from "../../../src/db/recipe";
import { IRecipe } from "../../../src/types";
import { useApi } from "../hooks/useApi";
import RecipeForm from "../features/recipe/RecipeForm";
import RecipeHeader from "../features/recipe/RecipeHeader";
import { putRecipe } from "../features/recipe/RecipeSlice";
import { useSnackbar } from "notistack";

export default function RecipePage() {
  const d = useDispatch();
  const h = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [headerText, setHeaderText] = useState("");

  const handleRecipeEdited = (recipe: IRecipe) => setHeaderText(recipe.name);

  const createRecipe = useApi<IRecipeModel>("POST", `/api/recipes`);
  const handleSubmit = (recipe: IRecipe) => {
    const [call] = createRecipe(recipe);
    call.then((resp) => {
      enqueueSnackbar(`Successfully created recipe ${resp.data.name}`, { variant: "success" });
      d(putRecipe(resp.data));
      h.push(`/recipes/${resp.data.id}`);
    });
  };

  return (
    <>
      <RecipeHeader title={headerText} />
      <RecipeForm onChange={handleRecipeEdited} onSubmit={handleSubmit} />
    </>
  );
}
