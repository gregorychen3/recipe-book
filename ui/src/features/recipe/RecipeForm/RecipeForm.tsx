import { Grid, GridProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { IRecipe } from "../../../../../src/types";
import { CourseValues, CuisineValues } from "../../../types";
import { GeneralSection } from "./GeneralSection";
import { IngredientsSection } from "./IngredientsSection";
import { InstructionsSection } from "./InstructionsSection";
import { SourcesSection } from "./SourcesSection";
import { defaultValues, RecipeFormValues, recipeFromValues, valuesFromRecipe } from "./types";

const SectionGridItem = styled(Grid)<GridProps>(({ theme }) => ({
  marginTop: theme.spacing(12),
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  course: Yup.mixed().oneOf([...CourseValues]),
  cuisine: Yup.mixed().oneOf([...CuisineValues]),
  servings: Yup.number().integer("Must be an integer").moreThan(0, "Must be greater than 0"),
});

interface Props {
  recipe?: IRecipe;
  onSubmit: (recipe: IRecipe) => void;
  onChange: (recipe: IRecipe) => void;
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
        <GeneralSection />
        <IngredientsSection />
        <InstructionsSection />
        <SourcesSection />
      </form>
    </FormProvider>
  );
}
