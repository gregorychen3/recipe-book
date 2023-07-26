import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Recipe } from "../../../src/recipe";
import { useApi } from "../app/hooks";
import { RecipeList } from "../features/recipe/RecipeList";
import { putRecipes } from "../features/recipe/recipeSlice";

export const GroupByValues = ["course", "cuisine", "alphabetical"] as const;
export type GroupBy = (typeof GroupByValues)[number];

export function RecipesPage() {
  const d = useDispatch();

  const getRecipes = useApi<Recipe[]>("GET", "/api/recipes");
  useEffect(() => {
    const [call] = getRecipes();
    call.then((resp) => d(putRecipes(resp.data)));
  }, [getRecipes, d]);

  return <RecipeList />;
}
