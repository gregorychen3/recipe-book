import { Grid, GridProps } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { Field, FieldArray, FieldArrayRenderProps, Form, FormikProps } from "formik";
import { Select, TextField } from "formik-mui";
import { LabelDivider } from "mui-label-divider";
import React, { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { IRecipe } from "../../../../../src/types";
import { CourseValues, CuisineValues } from "../../../types";
import { getCuisines } from "../helpers";
import { selectRecipes } from "../recipeSlice";
import {
  defaultIngredient,
  defaultValues,
  recipeFromValues,
  Values as RecipeFormValues,
  valuesFromRecipe,
} from "./types";

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

  const handleSubmit = (v: RecipeFormValues) => {
    onSubmit(recipeFromValues(values));
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} id="recipe-form">
        <InnerForm onChange={onChange} />
      </form>
    </FormProvider>
  );
}

const InnerForm = (props: { onChange?: (recipe: IRecipe) => void } & FormikProps<RecipeFormValues>) => {
  const { onChange, values } = props;
  const recipes = useSelector(selectRecipes);
  const cuisines = getCuisines(Object.values(recipes));

  useEffect(() => {
    onChange && onChange(recipeFromValues(values));
  }, [onChange, values]);

  const handleIngredientNameFieldChanged =
    (idx: number, { form, push }: FieldArrayRenderProps) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { values, setFieldValue } = form;
      setFieldValue(`ingredients.${idx}.name`, e.target.value);
      if (idx === values.ingredients.length - 1) {
        push(defaultIngredient());
      }
    };

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
    <Form id="recipe-form">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field component={TextField} name="name" type="text" label="Recipe Name" fullWidth />
        </Grid>

        <Grid item xs={4}>
          <Field component={TextField} name="servings" type="number" label="Servings" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <Field component={Select} formControl={{ sx: { width: "100%" } }} id="course" name="course" label="Course">
            {CourseValues.map((c) => (
              <MenuItem value={c} key={c}>
                {c}
              </MenuItem>
            ))}
          </Field>
        </Grid>
        <Grid item xs={4}>
          <Field component={Select} formControl={{ sx: { width: "100%" } }} id="cuisine" name="cuisine" label="Cuisine">
            {cuisines.map((c) => (
              <MenuItem value={c} key={c}>
                {c}
              </MenuItem>
            ))}
          </Field>
        </Grid>

        <SectionGridItem item xs={12}>
          <LabelDivider label="INGREDIENTS" />
        </SectionGridItem>
        <FieldArray name="ingredients">
          {(arrHelpers) =>
            values.ingredients.map((_, idx) => (
              <React.Fragment key={idx}>
                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    name={`ingredients.${idx}.qty`}
                    label={idx === 0 ? "Quantity" : undefined}
                    type="number"
                    inputProps={{ step: "0.01" }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    name={`ingredients.${idx}.unit`}
                    label={idx === 0 ? "Unit" : undefined}
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    name={`ingredients.${idx}.name`}
                    label={idx === 0 ? "Name" : undefined}
                    type="text"
                    fullWidth
                    onChange={handleIngredientNameFieldChanged(idx, arrHelpers)}
                  />
                </Grid>
              </React.Fragment>
            ))
          }
        </FieldArray>

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
      </Grid>
    </Form>
  );
};
