import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchRecipes, selectRecipes } from "../features/recipe/RecipeSlice";

export const GroupByValues = ["course", "cuisine", "alphabetical"] as const;
export type GroupBy = typeof GroupByValues[number];

export default function RecipesPage() {
  const d = useDispatch();
  useEffect(() => {
    d(fetchRecipes());
  }, [d]);

  const recipes = useSelector(selectRecipes);

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

  return (
    <>
      <div>Recipes Page</div>
      <div>{getGroupBy()}</div>
      <pre>{JSON.stringify(recipes, null, 2)}</pre>
    </>
  );
}
