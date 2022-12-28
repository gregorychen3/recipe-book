import { Grid } from "@mui/material";
import { LabelDivider } from "mui-label-divider";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ControlledTextField } from "../../../components/form/ControlledTextField";
import { defaultIngredient, RecipeFormValues as RecipeFormValues } from "./types";

export function IngredientsSection() {
  const { fields, append } = useFieldArray<RecipeFormValues>({ name: "ingredients" });
  const { setValue } = useFormContext<RecipeFormValues>();

  const handleIngredientNameChanged = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`ingredients.${idx}.name`, e.target.value);
    if (idx === fields.length - 1) {
      append(defaultIngredient());
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <LabelDivider label="INGREDIENTS" />
      </Grid>
      {fields.map((ingredient, idx) => (
        <React.Fragment key={ingredient.id}>
          <Grid item xs={4}>
            <ControlledTextField
              textFieldProps={{
                label: idx === 0 ? "Quantity" : undefined,
                type: "number",
                inputProps: { step: "0.01" },
                fullWidth: true,
              }}
              ctrlProps={{ name: `ingredients.${idx}.qty` }}
            />
          </Grid>
          <Grid item xs={4}>
            <ControlledTextField
              textFieldProps={{
                label: idx === 0 ? "Unit" : undefined,
                inputProps: { step: "0.01" },
                fullWidth: true,
              }}
              ctrlProps={{ name: `ingredients.${idx}.unit` }}
            />
          </Grid>
          <Grid item xs={4}>
            <ControlledTextField
              textFieldProps={{
                label: idx === 0 ? "Name" : undefined,
                fullWidth: true,
              }}
              ctrlProps={{ name: `ingredients.${idx}.name` }}
              onChange={handleIngredientNameChanged(idx)}
            />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}
