import { Grid } from "@mui/material";
import { LabelDivider } from "mui-label-divider";
import { useSelector } from "react-redux";
import { ControlledAutocomplete } from "../../../components/form/ControlledAutocomplete";
import { ControlledTextField } from "../../../components/form/ControlledTextField";
import { CourseValues } from "../../../types";
import { getCuisines } from "../helpers";
import { selectRecipes } from "../recipeSlice";

export function GeneralSection() {
  const recipes = useSelector(selectRecipes);
  const cuisines = getCuisines(Object.values(recipes));

  return (
    <>
      <Grid item xs={12}>
        <LabelDivider label="GENERAL" />
      </Grid>
      <Grid item xs={12}>
        <ControlledTextField textFieldProps={{ label: "Recipe Name", fullWidth: true }} ctrlProps={{ name: "name" }} />
      </Grid>
      <Grid item xs={4}>
        <ControlledTextField
          textFieldProps={{ label: "Servings", type: "number", fullWidth: true }}
          ctrlProps={{ name: "servings" }}
        />
      </Grid>
      <Grid item xs={4}>
        <ControlledAutocomplete
          ctrlProps={{ name: "course" }}
          textFieldProps={{ label: "Course" }}
          autocompleteProps={{ options: CourseValues, disableClearable: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <ControlledAutocomplete
          ctrlProps={{ name: "cuisine" }}
          textFieldProps={{ label: "Cuisine" }}
          autocompleteProps={{ options: cuisines, disableClearable: true }}
        />
      </Grid>
    </>
  );
}
