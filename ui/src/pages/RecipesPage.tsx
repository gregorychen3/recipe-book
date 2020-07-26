import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import RecipeList from "../features/recipe/RecipeList";
import { fetchRecipes } from "../features/recipe/RecipeSlice";

export const GroupByValues = ["course", "cuisine", "alphabetical"] as const;
export type GroupBy = typeof GroupByValues[number];

export default function RecipesPage() {
  const d = useDispatch();
  useEffect(() => {
    d(fetchRecipes());
  }, [d]);

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
      <RecipeList groupBy={getGroupBy()} />
    </>
  );
}
