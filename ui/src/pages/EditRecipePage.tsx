import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IRecipeModel } from "../../../src/db/recipe";
import { IRecipe } from "../../../src/types";
import { useApi } from "../apiClient";
import RecipeForm from "../features/recipe/RecipeForm";
import RecipeHeader from "../features/recipe/RecipeHeader";
import { putRecipe, selectRecipe } from "../features/recipe/RecipeSlice";

export default function EditRecipePage() {
  const d = useDispatch();
  const history = useHistory();

  const [headerText, setHeaderText] = useState("");

  const { recipeId } = useParams<{ recipeId: string }>();
  const recipe = useSelector(selectRecipe(recipeId));

  const getRecipe = useApi<IRecipeModel>("GET", `/api/recipes/${recipeId}`);
  const updateRecipe = useApi<IRecipeModel>("POST", `/api/recipes/${recipeId}`);

  useEffect(() => {
    const [call] = getRecipe();
    call.then((resp) => {
      d(putRecipe(resp.data));
    });
  }, [getRecipe, d]);

  useEffect(() => {
    setHeaderText(recipe?.name.toUpperCase() ?? "");
  }, [recipe]);

  if (!recipe) {
    return null;
  }

  const handleRecipeSaved = (recipe: IRecipe) => {
    const [call] = updateRecipe(recipe);
    call.then((resp) => {
      d(putRecipe(resp.data));
      history.push(`/recipes/${recipeId}`);
    });
  };

  const handleRecipeEdited = (recipe: IRecipe) => setHeaderText(recipe.name);

  return (
    <>
      <RecipeHeader title={headerText} />
      <RecipeForm recipe={recipe} onChange={handleRecipeEdited} onSubmit={handleRecipeSaved} />
    </>
  );
}
