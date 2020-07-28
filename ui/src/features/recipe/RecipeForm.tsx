import { Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { ICourse, ICuisine, IIngredient, IRecipe } from "../../../../src/types";
import LabelDivider from "../../components/LabelDivider";

const defaultIngredient = (): IngredientValues => ({ qty: "", unit: "", name: "" });

const valuesFromRecipe = (r: IRecipe): Values => {
  const { name, course, cuisine, servings, ingredients, instructions, sources } = r;
  const ret: Values = {
    name,
    course,
    cuisine,
    servings,
    ingredients: [
      ...ingredients.map((i) => ({
        qty: i.qty ?? ("" as const),
        unit: i.unit ?? "",
        name: i.name,
      })),
      defaultIngredient(),
    ],
    instructions: [...instructions, ""],
    sources: [...sources, ""],
  };
  return ret;
};

const recipeFromValues = (values: Values): IRecipe => {
  const { name, course, cuisine, servings, ingredients, instructions, sources } = values;
  const ret: IRecipe = {
    name,
    course,
    cuisine,
    servings,
    ingredients: ingredients
      .filter((i) => i.qty && i.unit && i.name)
      .map(
        (i): IIngredient => ({
          qty: i.qty === "" ? undefined : i.qty,
          unit: i.unit === "" ? undefined : i.unit,
          name: i.name,
        })
      ),
    instructions: instructions.filter((i) => i),
    sources: sources.filter((s) => s),
  };
  return ret;
};

interface IngredientValues {
  qty: number | "";
  unit: string;
  name: string;
}
interface Values {
  name: string;
  course: ICourse;
  cuisine: ICuisine;
  servings: number;
  ingredients: IngredientValues[];
  instructions: string[];
  sources: string[];
}

interface Props {
  recipe: IRecipe;
}
export default function RecipeForm({ recipe }: Props) {
  return (
    <Formik
      initialValues={valuesFromRecipe(recipe)}
      validate={(values) => {
        return {};
      }}
      onSubmit={(values, { setSubmitting }) => {
        const recipe = recipeFromValues(values);
        console.log(recipe);
        setSubmitting(false);
      }}
    >
      {({ values, submitForm, isSubmitting }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field component={TextField} name="name" type="text" label="Recipe Name" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <Field component={TextField} name="servings" type="number" label="Servings" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <Field component={TextField} name="course" type="string" label="Course" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <Field component={TextField} name="cuisine" type="string" label="Cuisine" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <LabelDivider label="INGREDIENTS" />
            </Grid>
            {values.ingredients.map((i, idx) => (
              <>
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
                  />
                </Grid>
              </>
            ))}

            <Grid item xs={12}>
              <LabelDivider label="INSTRUCTIONS" />
            </Grid>
            {values.instructions.map((i, idx) => (
              <Grid item xs={12}>
                <Field component={TextField} name={`instructions.${idx}`} type="string" fullWidth />
              </Grid>
            ))}

            <Grid item xs={12}>
              <LabelDivider label="SOURCES" />
            </Grid>
            {values.sources.map((s, idx) => (
              <Grid item xs={12}>
                <Field component={TextField} name={`sources.${idx}`} type="string" fullWidth />
              </Grid>
            ))}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
