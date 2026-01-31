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
  size?: "small" | "medium";
  disabled?: boolean;
};

export function ControlledSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  size = "medium",
  disabled = false,
}: ControlledSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField disabled={disabled} select label={label} fullWidth size={size} {...field}>
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
