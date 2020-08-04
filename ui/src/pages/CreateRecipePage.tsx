import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IRecipe } from "../../../src/types";
import { defaultRecipe } from "../features/recipe/helpers";
import RecipeForm from "../features/recipe/RecipeForm";
import RecipeHeader from "../features/recipe/RecipeHeader";
import { createRecipe } from "../features/recipe/RecipeSlice";

export default function RecipePage() {
  const d = useDispatch();

  const [recipe, setRecipe] = useState(defaultRecipe);
  const [headerText, setHeaderText] = useState("");

  useEffect(() => {
    setHeaderText(recipe?.name.toUpperCase() ?? "");
  }, [recipe]);

  const handleRecipeEdited = (recipe: IRecipe) => setHeaderText(recipe.name);
  const handleRecipeSaved = (recipe: IRecipe) => d(createRecipe(recipe));

  return (
    <>
      <RecipeHeader title={headerText} onDelete={() => {}} onEdit={() => {}} disableSave={false} />
      <RecipeForm recipe={recipe} onChange={handleRecipeEdited} onSubmit={handleRecipeSaved} />
    </>
  );
}
