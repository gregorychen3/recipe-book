import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Grid, IconButton, styled } from "@mui/material";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { ControlledTextField } from "./ControlledTextField";

function isTuple(x: any): x is { k: string; v: string } {
  return (
    x.hasOwnProperty("k") &&
    x.hasOwnProperty("v") &&
    typeof x.k === "string" &&
    typeof x.v === "string"
  );
}

function isTupleMap(x: any): x is { k: string; v: string }[] {
  if (!Array.isArray(x)) {
    return false;
  }

  return x.every(isTuple);
}

export interface ControlledStringMapFieldProps {
  name: string;
  disabled?: boolean;
}

export function ControlledStringMapField({
  name,
  disabled = false,
}: ControlledStringMapFieldProps) {
  const { fields, append, remove } = useFieldArray({ name });

  if (!isTupleMap(fields)) {
    throw new Error(
      `Invalid value passed to form field ${name}: ${JSON.stringify(fields)}`
    );
  }

  return (
    <GridContainer container item spacing={2}>
      {fields.map((field, idx) => (
        <React.Fragment key={field.id}>
          <Grid item xs={6}>
            <ControlledTextField
              ctrlProps={{
                name: `${name}.${idx}.k`,
                rules: { required: "Required" },
              }}
              textFieldProps={{
                label: idx === 0 ? "Key" : undefined,
                fullWidth: true,
                disabled,
                helperText: " ",
              }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex" }}>
            <ControlledTextField
              ctrlProps={{ name: `${name}.${idx}.v` }}
              textFieldProps={{
                label: idx === 0 ? "Value" : undefined,
                fullWidth: true,
                disabled,
                helperText: " ",
              }}
            />
            {!disabled && (
              <IconButton
                onClick={() => remove(idx)}
                size="small"
                sx={{ ml: 1 }}
              >
                <DeleteOutlineIcon color="error" />
              </IconButton>
            )}
          </Grid>
        </React.Fragment>
      ))}
      {!disabled && (
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <IconButton onClick={() => append({ k: "", v: "" })} size="small">
            <AddIcon color="primary" />
          </IconButton>
        </Grid>
      )}
    </GridContainer>
  );
}

const GridContainer = styled(Grid)(() => ({
  "& > .MuiGrid-item:nth-of-type(2) > button": {
    alignSelf: "center", // prevent button ripple from stretching
  },
  // All rows after the first row require this alignment tweak due to the fact
  // that they are shorter. The first row's elements are taller because of their
  // "Key" and "Value" labels.
  "& > .MuiGrid-item:nth-of-type(n+3)": {
    paddingTop: 0,
    "& > button": {
      alignSelf: "baseline",
    },
  },
}));
