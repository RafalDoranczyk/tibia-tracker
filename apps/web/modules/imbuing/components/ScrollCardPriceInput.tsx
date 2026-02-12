import { TextField, type TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { ImbuingFormValues, ImbuingPriceKey } from "../schemas";

type ScrollCardPriceInputProps = TextFieldProps & {
  inputKey: ImbuingPriceKey;
  label: string;
};

export function ScrollCardPriceInput({
  inputKey,
  label,
  ...textFieldProps
}: ScrollCardPriceInputProps) {
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
