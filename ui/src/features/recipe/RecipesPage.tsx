import { useEffect } from "react";
import { getApiClient } from "../api/apiClient";
import { useTokenFn } from "../api/useTokenFn";
import { RecipeList } from "./RecipeList";
import { putRecipes } from "./recipeSlice";
import { useAppDispatch } from "../../app/hooks";

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
