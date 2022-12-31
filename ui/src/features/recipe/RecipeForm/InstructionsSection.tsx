import { Grid } from "@mui/material";
import { LabelDivider } from "mui-label-divider";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ControlledTextField } from "../../../components/form/ControlledTextField";
import { defaultInstruction, RecipeFormValues } from "./types";

export function InstructionsSection() {
  const { fields, append } = useFieldArray<RecipeFormValues>({ name: "instructions" });
  const { setValue } = useFormContext<RecipeFormValues>();

  const handleInstructionFieldChanged = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`instructions.${idx}`, { value: e.target.value });
    if (idx === fields.length - 1) {
      append(defaultInstruction());
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <LabelDivider label="INSTRUCTIONS" />
      </Grid>
      {fields.map((instruction, idx) => (
        <React.Fragment key={instruction.id}>
          <Grid item xs={12}>
            <ControlledTextField
              onChange={handleInstructionFieldChanged(idx)}
              textFieldProps={{
                label: idx === 0 ? "Enter step" : undefined,
                fullWidth: true,
              }}
              ctrlProps={{ name: `instructions.${idx}.value` }}
            />
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
}
