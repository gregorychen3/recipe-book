import { Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { IRecipe } from "../../../../src/types";
import LabelDivider from "../../components/LabelDivider";

interface Props {
  recipe: IRecipe;
}
export default function RecipeForm({ recipe }: Props) {
  return (
    <Formik
      initialValues={recipe}
      validate={(values) => {
        return {};
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="name"
                type="text"
                label="Recipe Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                component={TextField}
                name="servings"
                type="number"
                label="Servings"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                component={TextField}
                name="course"
                type="string"
                label="Course"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                component={TextField}
                name="cuisine"
                type="string"
                label="Cuisine"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <LabelDivider label="INGREDIENTS" />
            </Grid>
            {recipe.ingredients.map((i, idx) => (
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
            {recipe.instructions.map((i, idx) => (
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name={`instructions.${idx}`}
                  type="string"
                  fullWidth
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <LabelDivider label="SOURCES" />
            </Grid>
            {recipe.sources.map((s, idx) => (
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name={`sources.${idx}`}
                  type="string"
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
