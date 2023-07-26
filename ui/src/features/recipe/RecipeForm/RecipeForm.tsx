import { Grid } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Recipe } from "../../../../../src/recipe";
import { GeneralSection } from "./GeneralSection";
import { IngredientsSection } from "./IngredientsSection";
import { InstructionsSection } from "./InstructionsSection";
import { SourcesSection } from "./SourcesSection";
import {
  RecipeFormValues,
  defaultValues,
  recipeFromValues,
  valuesFromRecipe,
} from "./types";

interface Props {
  recipe?: Recipe;
  onSubmit: (recipe: Recipe) => void;
  onChange: (recipe: Recipe) => void;
}

export function RecipeForm({ recipe, onSubmit, onChange }: Props) {
  const form = useForm<RecipeFormValues>({
    mode: "onTouched",
    defaultValues: recipe ? valuesFromRecipe(recipe) : defaultValues,
  });

  useEffect(() => {
    if (!recipe) {
      return;
    }

    form.reset(valuesFromRecipe(recipe));
  }, [recipe, form]);

  const values = useWatch({ control: form.control }) as RecipeFormValues;
  useEffect(() => {
    onChange?.(recipeFromValues(values));
  }, [values, onChange]);

  const handleSubmit = (v: RecipeFormValues) => onSubmit(recipeFromValues(v));

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} id="recipe-form">
        <Grid container spacing={2}>
          <GeneralSection />
          <IngredientsSection />
          <InstructionsSection />
          <SourcesSection />
        </Grid>
      </form>
    </FormProvider>
  );
}
