import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { IRecipe } from "../../../src/types";
import RecipeForm from "../features/recipe/RecipeForm";
import RecipeHeader from "../features/recipe/RecipeHeader";
import { createRecipe } from "../features/recipe/RecipeSlice";

export default function RecipePage() {
  const d = useDispatch();
  const history = useHistory();

  const [headerText, setHeaderText] = useState("");

  const handleRecipeEdited = (recipe: IRecipe) => setHeaderText(recipe.name);
  const handleRecipeSaved = (recipe: IRecipe) => d(createRecipe({ recipe, history }));

  return (
    <>
      <RecipeHeader title={headerText} />
      <RecipeForm onChange={handleRecipeEdited} onSubmit={handleRecipeSaved} />
    </>
  );
}
