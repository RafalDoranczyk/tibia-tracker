"use client";

import { MenuItem, TextField } from "@mui/material";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";

type ControlledSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: { id: PathValue<T, Path<T>>; name: string }[];
  defaultValue?: PathValue<T, Path<T>>;
  errorMessage?: string;
};

export function ControlledSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
}: ControlledSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField select label={label} fullWidth {...field}>
          {options.map((opt) => (
            <MenuItem key={String(opt.id)} value={opt.id}>
              {opt.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
