import { Grid, GridProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FieldArrayRenderProps } from "formik";
import React, { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { IRecipe } from "../../../../../src/types";
import { CourseValues, CuisineValues } from "../../../types";
import { GeneralSection } from "./GeneralSection";
import { IngredientsSection } from "./IngredientsSection";
import { defaultValues, recipeFromValues, Values as RecipeFormValues, valuesFromRecipe } from "./types";

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

  const handleSubmit = (v: RecipeFormValues) => onSubmit(recipeFromValues(values));

  const handleInstructionFieldChanged =
    (idx: number, { form, push }: FieldArrayRenderProps) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { values, setFieldValue } = form;
      setFieldValue(`instructions.${idx}`, e.target.value);
      if (idx === values.instructions.length - 1) {
        push("");
      }
    };

  const handleSourceFieldChanged =
    (idx: number, { form, push }: FieldArrayRenderProps) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { values, setFieldValue } = form;
      setFieldValue(`sources.${idx}`, e.target.value);
      if (idx === values.sources.length - 1) {
        push("");
      }
    };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} id="recipe-form">
        <GeneralSection />
        <IngredientsSection />
        {/*
        <SectionGridItem item xs={12}>
          <LabelDivider label="INSTRUCTIONS" />
        </SectionGridItem>
        <FieldArray name="instructions">
          {(arrHelpers) =>
            values.instructions.map((_, idx) => (
              <Grid item xs={12} key={idx}>
                <Field
                  component={TextField}
                  name={`instructions.${idx}`}
                  label={idx === 0 ? "Enter step" : undefined}
                  type="string"
                  fullWidth
                  onChange={handleInstructionFieldChanged(idx, arrHelpers)}
                />
              </Grid>
            ))
          }
        </FieldArray>
        <SectionGridItem item xs={12}>
          <LabelDivider label="SOURCES" />
        </SectionGridItem>
        <FieldArray name="sources">
          {(arrHelpers) =>
            values.sources.map((_, idx) => (
              <Grid item xs={12} key={idx}>
                <Field
                  component={TextField}
                  name={`sources.${idx}`}
                  label={idx === 0 ? "Enter source" : undefined}
                  type="string"
                  fullWidth
                  onChange={handleSourceFieldChanged(idx, arrHelpers)}
                />
              </Grid>
            ))
          }
        </FieldArray>
*/}
      </form>
    </FormProvider>
  );
}
