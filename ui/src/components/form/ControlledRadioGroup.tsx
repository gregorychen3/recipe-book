import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormHelperText,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import { Controller, UseControllerProps } from "react-hook-form";

export type RadioGroupOpt<V> = { label: FormControlLabelProps["label"]; value: V };

export type ControlledRadioGroupProps<V> = {
  label?: string;
  opts: RadioGroupOpt<V>[];
  ctrlProps: UseControllerProps;
  muiFormControlProps?: FormControlProps;
};

export function ControlledRadioGroup<V>(props: ControlledRadioGroupProps<V>) {
  const { label, ctrlProps, opts, muiFormControlProps } = props;

  return (
    <Controller
      {...ctrlProps}
      render={({ field, fieldState }) => {
        const hasErr = !!fieldState.error;
        const errMsg = fieldState.error?.message ?? "Invalid";

        return (
          <FormControl variant="standard" {...muiFormControlProps} error={hasErr}>
            {label && <FormLabel>{label}</FormLabel>}
            <RadioGroup {...field}>
              {opts.map(({ value, label }, idx) => (
                <FormControlLabel value={value} label={label} control={<Radio />} key={idx} />
              ))}
            </RadioGroup>
            {hasErr && <FormHelperText>{errMsg}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
