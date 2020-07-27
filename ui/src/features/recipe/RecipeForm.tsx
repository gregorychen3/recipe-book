import React from "react";
import { IRecipe } from "../../../../src/types";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
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
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Email"
          />
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
