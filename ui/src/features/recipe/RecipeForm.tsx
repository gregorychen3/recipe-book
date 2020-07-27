import React from "react";
import { IRecipe } from "../../../../src/types";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";

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
          </Grid>
          <br />
          <Field
            component={TextField}
            type="password"
            label="Password"
            name="password"
          />
          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
