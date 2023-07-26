import { useEffect } from "react";
import { getApiClient } from "../features/api/apiClient";
import { useTokenFn } from "../features/api/useTokenFn";
import { RecipeList } from "../features/recipe/RecipeList";
import { putRecipes } from "../features/recipe/recipeSlice";
import { useAppDispatch } from "../app/hooks";

export function RecipesPage() {
  const d = useAppDispatch();

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
