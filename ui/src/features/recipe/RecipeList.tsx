import React from "react";
import { useSelector } from "react-redux";
import { GroupBy } from "../../pages/RecipesPage";
import { selectRecipes } from "./RecipeSlice";

interface Props {
  groupBy: GroupBy;
}
export default function RecipeList({ groupBy }: Props) {
  const recipes = useSelector(selectRecipes);
  return <>REcipe list</>;
}
