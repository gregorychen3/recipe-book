import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { IRecipeModel } from "../../../src/db/recipe";
import { IRecipe } from "../../../src/types";
import { useApi } from "../hooks/useApi";
import RecipeForm from "../features/recipe/RecipeForm";
import RecipeHeader from "../features/recipe/RecipeHeader";
import { putRecipe } from "../features/recipe/RecipeSlice";

export default function RecipePage() {
  const d = useDispatch();
  const history = useHistory();

  const [headerText, setHeaderText] = useState("");

  const handleRecipeEdited = (recipe: IRecipe) => setHeaderText(recipe.name);

  const createRecipe = useApi<IRecipeModel>("POST", `/api/recipes`);
  const handleRecipeSaved = (recipe: IRecipe) => {
    const [call] = createRecipe(recipe);
    call.then((resp) => {
      d(putRecipe(resp.data));
      history.push(`/recipes/${resp.data.id}`);
    });
  };

  return (
    <>
      <RecipeHeader title={headerText} />
      <RecipeForm onChange={handleRecipeEdited} onSubmit={handleRecipeSaved} />
    </>
  );
}
