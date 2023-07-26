import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RecipeList } from "../features/recipe/RecipeList";
import { putRecipes } from "../features/recipe/recipeSlice";
import { getApiClient, useTokenFn } from "../features/api/apiClient";

export const GroupByValues = ["course", "cuisine", "alphabetical"] as const;
export type GroupBy = (typeof GroupByValues)[number];

export function RecipesPage() {
  const d = useDispatch();

  const tokenFn = useTokenFn();

  useEffect(() => {
    tokenFn().then((token) =>
      getApiClient({ token })
        .listRecipes()
        .then((recipes) => d(putRecipes(recipes)))
    );
  }, [d, tokenFn]);

  return <RecipeList />;
}
