import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useApiClient } from "../useApiClient";
import { RecipeList } from "../features/recipe/RecipeList";
import { putRecipes } from "../features/recipe/recipeSlice";

export const GroupByValues = ["course", "cuisine", "alphabetical"] as const;
export type GroupBy = (typeof GroupByValues)[number];

export function RecipesPage() {
  const d = useDispatch();
  const client = useApiClient();

  useEffect(() => {
    client.listRecipes().then((recipes) => d(putRecipes(recipes)));
  }, [client, d]);

  return <RecipeList />;
}
