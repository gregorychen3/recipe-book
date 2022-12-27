import { Grid, GridProps } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { Field, FieldArray, FieldArrayRenderProps, Form, Formik, FormikProps } from "formik";
import { Select, TextField } from "formik-mui";
import { LabelDivider } from "mui-label-divider";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { ICourse, ICuisine, IIngredient, IRecipe } from "../../../../../src/types";
import { CourseValues, CuisineValues } from "../../../types";
import { getCuisines } from "../helpers";
import { selectRecipes } from "../recipeSlice";

const SectionGridItem = styled(Grid)<GridProps>(({ theme }) => ({
  marginTop: theme.spacing(12),
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  course: Yup.mixed().oneOf([...CourseValues]),
  cuisine: Yup.mixed().oneOf([...CuisineValues]),
  servings: Yup.number().integer("Must be an integer").moreThan(0, "Must be greater than 0"),
});

const defaultIngredient = (): IngredientValues => ({ qty: "", unit: "", name: "" });

const defaultValues: Values = {
  name: "",
  course: "Primi",
  cuisine: "Italian",
  servings: 2,
  ingredients: [defaultIngredient()],
  instructions: [""],
  sources: [""],
};

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

const recipeFromValues = ({
  name,
  course,
  cuisine,
  servings,
  ingredients,
  instructions,
  sources,
}: Values): IRecipe => ({
  name,
  course,
  cuisine,
  servings,
  ingredients: ingredients
    .filter((i) => i.name)
    .map((i): IIngredient => ({ qty: i.qty || undefined, unit: i.unit || undefined, name: i.name })),
  instructions: instructions.filter((i) => i),
  sources: sources.filter((s) => s),
});

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
  recipe?: IRecipe;
  onSubmit: (recipe: IRecipe) => void;
  onChange?: (recipe: IRecipe) => void;
}
export function RecipeForm({ recipe, onSubmit, onChange }: Props) {
  return (
    <Formik
      initialValues={recipe ? valuesFromRecipe(recipe) : defaultValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const recipe = recipeFromValues(values);
        onSubmit(recipe);
        setSubmitting(false);
      }}
    >
      {(formikProps) => <InnerForm onChange={onChange} {...formikProps} />}
    </Formik>
  );
}

const InnerForm = (props: { onChange?: (recipe: IRecipe) => void } & FormikProps<Values>) => {
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
