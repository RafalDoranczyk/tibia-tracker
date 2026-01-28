import { TextField, type TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { ImbuingFormValues, ImbuingPriceKey } from "../types";

type ImbuingScrollCardPriceInputProps = TextFieldProps & {
  inputKey: ImbuingPriceKey;
  label: string;
};

export function ImbuingScrollCardPriceInput({
  inputKey,
  label,
  ...textFieldProps
}: ImbuingScrollCardPriceInputProps) {
  const { control } = useFormContext<ImbuingFormValues>();

  return (
    <Controller
      name={inputKey}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type="number"
          slotProps={{ htmlInput: { min: 0 } }}
          {...textFieldProps}
        />
      )}
    />
  );
}
