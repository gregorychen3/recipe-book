import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteValue,
  ChipTypeMap,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import { Controller, UseControllerProps } from "react-hook-form";

export type ControlledAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> = {
  onChange?: (value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>) => void;
  textFieldProps: TextFieldProps;
  ctrlProps: UseControllerProps;
  autocompleteProps: Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    "onChange" | "renderInput"
  >;
};

export function ControlledAutocomplete<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(props: ControlledAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const { onChange, ctrlProps, textFieldProps, autocompleteProps } = props;

  return (
    <Controller
      {...ctrlProps}
      render={({ field, fieldState }) => {
        const validationProps = fieldState.error
          ? { error: true, helperText: fieldState.error.message ?? "Invalid" }
          : undefined;

        const { onChange: fieldOnChange, ...restFieldProps } = field;

        const handleChange = (_: unknown, value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>) =>
          onChange ? onChange(value) : fieldOnChange(value);

        return (
          <Autocomplete
            {...autocompleteProps}
            renderInput={(params) => (
              <TextField
                required={!!ctrlProps.rules?.required}
                {...params}
                {...textFieldProps}
                {...validationProps}
                InputLabelProps={{ shrink: true }}
              />
            )}
            onChange={handleChange}
            {...restFieldProps}
          />
        );
      }}
    />
  );
}
