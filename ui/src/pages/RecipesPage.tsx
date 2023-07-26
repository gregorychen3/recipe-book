import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApiClient } from "../features/api/apiClient";
import { useTokenFn } from "../features/api/useTokenFn";
import { RecipeList } from "../features/recipe/RecipeList";
import { putRecipes } from "../features/recipe/recipeSlice";

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
