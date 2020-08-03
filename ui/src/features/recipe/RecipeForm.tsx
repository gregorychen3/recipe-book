import { Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Field, FieldArray, FieldArrayRenderProps, Form, Formik, FormikProps } from "formik";
import { Select, TextField } from "formik-material-ui";
import React from "react";
import { useSelector } from "react-redux";
import { IRecipeModel } from "../../../../src/db/recipe";
import { ICourse, ICuisine, IIngredient, IRecipe } from "../../../../src/types";
import LabelDivider from "../../components/LabelDivider";
import { getCourses, getCuisines } from "./helpers";
import { selectRecipes } from "./RecipeSlice";

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
  recipe: IRecipeModel;
  onSubmit: (recipe: IRecipe) => void;
}
export default function RecipeForm({ recipe, onSubmit }: Props) {
  const recipes = useSelector(selectRecipes);
  const courses = getCourses(recipes);
  const cuisines = getCuisines(recipes);

  const handleInstructionsFieldChanged = (
    idx: number,
    formikProps: FormikProps<Values>,
    arrHelpers: FieldArrayRenderProps
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { values, setFieldValue } = formikProps;
    setFieldValue(`instructions.${idx}`, e.target.value);
    if (idx === values.instructions.length - 1) {
      arrHelpers.push("");
    }
  };

  return (
    <Formik
      initialValues={valuesFromRecipe(recipe)}
      validate={(values) => {
        return {};
      }}
      onSubmit={(values, { setSubmitting }) => {
        const recipe = recipeFromValues(values);
        onSubmit(recipe);
        setSubmitting(false);
      }}
    >
      {(formikProps) => {
        const { values } = formikProps;
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
                <FormControl fullWidth>
                  <InputLabel htmlFor="course">Course</InputLabel>
                  <Field component={Select} name="course" inputProps={{ id: "course" }}>
                    {courses.map((c) => (
                      <MenuItem value={c} key={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="cuisine">Cuisine</InputLabel>
                  <Field component={Select} name="cuisine" inputProps={{ id: "cuisine" }}>
                    {cuisines.map((c) => (
                      <MenuItem value={c} key={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <LabelDivider label="INGREDIENTS" />
              </Grid>
              {values.ingredients.map((i, idx) => (
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
                    />
                  </Grid>
                </React.Fragment>
              ))}

              <Grid item xs={12}>
                <LabelDivider label="INSTRUCTIONS" />
              </Grid>
              <FieldArray name="instructions">
                {(arrHelpers) =>
                  values.instructions.map((i, idx) => (
                    <Grid item xs={12} key={idx}>
                      <Field
                        component={TextField}
                        name={`instructions.${idx}`}
                        type="string"
                        fullWidth
                        onChange={handleInstructionsFieldChanged(idx, formikProps, arrHelpers)}
                      />
                    </Grid>
                  ))
                }
              </FieldArray>
              <Grid item xs={12}>
                <LabelDivider label="SOURCES" />
              </Grid>
              {values.sources.map((s, idx) => (
                <Grid item xs={12} key={idx}>
                  <Field component={TextField} name={`sources.${idx}`} type="string" fullWidth />
                </Grid>
              ))}
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}
