import { TextField, type TextFieldProps } from "@mui/material";
import type { ImbuingPriceKey } from "@repo/database/imbuing-prices";
import { Controller, useFormContext } from "react-hook-form";
import type { ImbuingFormValues } from "../schemas";

type ScrollCardPriceInputProps = TextFieldProps & {
  inputKey: ImbuingPriceKey;
  inputVariant?: "scroll" | "item";
};

export function ScrollCardPriceInput({
  inputKey,
  inputVariant = "item",
}: ScrollCardPriceInputProps) {
  const { control } = useFormContext<ImbuingFormValues>();
  const scrollVariant = inputVariant === "scroll";

  return (
    <Controller
      name={inputKey}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          type="number"
          size={scrollVariant ? "medium" : "small"}
          sx={{ maxWidth: 120 }}
          label={scrollVariant ? "Scroll Price" : undefined}
          slotProps={{
            htmlInput: { min: 0 },
          }}
        />
      )}
    />
  );
}
