"use client";

import {
  TextField as MaterialTextField,
  type TextFieldProps as MaterialTextFieldProps,
} from "@mui/material";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";

type ControlledTextFieldProps<TFieldValues extends FieldValues> = MaterialTextFieldProps & {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
  label?: string;
};

export function ControlledTextField<TFieldValues extends FieldValues>({
  control,
  defaultValue,
  label,
  name,
  type,
  ...props
}: ControlledTextFieldProps<TFieldValues>) {
  const isNumber = type === "number";

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <MaterialTextField
          {...props}
          {...field}
          type={type}
          value={field.value ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            if (isNumber) {
              field.onChange(value === "" ? undefined : Number(value));
            } else {
              field.onChange(value);
            }
          }}
          error={!!fieldState.error}
          label={label}
          sx={{ width: "100%", ...props.sx }}
        />
      )}
    />
  );
}
