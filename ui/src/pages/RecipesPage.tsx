import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { IRecipeModel } from "../../../src/db/recipe";
import { useApi } from "../apiClient";
import RecipeList from "../features/recipe/RecipeList";
import { putRecipes } from "../features/recipe/RecipeSlice";

export const GroupByValues = ["course", "cuisine", "alphabetical"] as const;
export type GroupBy = typeof GroupByValues[number];

export default function RecipesPage() {
  const d = useDispatch();

  const getRecipes = useApi<IRecipeModel[]>("GET", "/api/recipes");
  useEffect(() => {
    const [call] = getRecipes();
    call.then((resp) => {
      d(putRecipes(resp.data));
    });
  }, [getRecipes, d]);

  const { search } = useLocation();
  const getGroupBy = (): GroupBy => {
    const groupBy = new URLSearchParams(search).get("groupBy");
    switch (groupBy) {
      case "course":
      case "cuisine":
      case "alphabetical":
        return groupBy;
      default:
        return "course";
    }
  };

  return <RecipeList groupBy={getGroupBy()} />;
}
