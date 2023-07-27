import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getApiClient } from "../api/apiClient";
import { useTokenFn } from "../api/useTokenFn";
import { RecipeList } from "./RecipeList";
import { putRecipes } from "./recipeSlice";

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
