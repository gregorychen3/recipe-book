import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, selectRecipes } from "../features/recipe/RecipeSlice";

export default function RecipesPage() {
  const d = useDispatch();
  useEffect(() => {
    d(fetchRecipes());
  }, [d]);

  const recipes = useSelector(selectRecipes);

  return (
    <>
      <div>Recipes Page</div>
      <pre>{JSON.stringify(recipes, null, 2)}</pre>
    </>
  );
}
