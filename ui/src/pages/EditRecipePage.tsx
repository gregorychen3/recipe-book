import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IRecipe } from "../../../src/types";
import RecipeForm from "../features/recipe/RecipeForm";
import RecipeHeader from "../features/recipe/RecipeHeader";
import { fetchRecipe, selectRecipe, updateRecipe } from "../features/recipe/RecipeSlice";

export default function EditRecipePage() {
  const d = useDispatch();

  const [headerText, setHeaderText] = useState("");

  const { recipeId } = useParams();
  const recipe = useSelector(selectRecipe(recipeId));

  useEffect(() => {
    !recipe && d(fetchRecipe(recipeId));
  }, [recipe, recipeId, d]);

  useEffect(() => {
    setHeaderText(recipe?.name.toUpperCase() ?? "");
  }, [recipe]);

  if (!recipe) {
    return null;
  }

  const handleSubmit = (recipe: IRecipe) => d(updateRecipe({ recipeId, recipe }));
  const handleRecipeEdited = (recipe: IRecipe) => setHeaderText(recipe.name);

  return (
    <>
      <RecipeHeader title={headerText} />
      <RecipeForm recipe={recipe} onChange={handleRecipeEdited} onSubmit={handleSubmit} />
    </>
  );
}
