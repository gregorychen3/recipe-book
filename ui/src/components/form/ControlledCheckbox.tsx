import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { Controller, UseControllerProps } from "react-hook-form";

export type ControlledCheckboxProps = {
  checkboxProps: CheckboxProps;
  label: string;
  ctrlProps: UseControllerProps;
};

export function ControlledCheckbox(props: ControlledCheckboxProps) {
  const { ctrlProps, checkboxProps, label } = props;

  return (
    <Controller
      {...ctrlProps}
      render={({ field, fieldState }) => {
        const hasErr = !!fieldState.error;
        const errMsg = fieldState.error?.message ?? "Invalid";

        return (
          <FormControl error={hasErr}>
            <FormControlLabel
              label={label}
              control={
                <Checkbox checked={field.value} {...field} {...checkboxProps} />
              }
            />
            {hasErr && <FormHelperText>{errMsg}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
