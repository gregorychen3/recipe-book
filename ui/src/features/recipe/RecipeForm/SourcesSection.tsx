import { Grid } from "@mui/material";
import { LabelDivider } from "mui-label-divider";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ControlledTextField } from "../../../components/form/ControlledTextField";
import { RecipeFormValues, defaultSource } from "./types";

export function SourcesSection() {
  const { fields, append } = useFieldArray<RecipeFormValues>({
    name: "sources",
  });
  const { setValue } = useFormContext<RecipeFormValues>();

  const handleSourceFieldChanged =
    (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(`sources.${idx}`, { value: e.target.value });
      if (idx === fields.length - 1) {
        append(defaultSource());
      }
    };

  return (
    <>
      <Grid item xs={12}>
        <LabelDivider label="SOURCES" />
      </Grid>
      {fields.map((source, idx) => (
        <React.Fragment key={source.id}>
          <Grid item xs={12}>
            <ControlledTextField
              onChange={handleSourceFieldChanged(idx)}
              textFieldProps={{
                label: idx === 0 ? "Enter source" : undefined,
                fullWidth: true,
              }}
              ctrlProps={{ name: `sources.${idx}.value` }}
            />
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
}
