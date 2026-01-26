import { TextField, type TextFieldProps } from "@mui/material";
import { useState } from "react";

import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";

import { PRICE_DEBOUNCE_MS } from "../constants";
import { useImbuingPriceStore } from "../imbuingPriceStore";
import type { ImbuingPriceKey } from "../types";

type ImbuingScrollCardPriceInputProps = TextFieldProps & {
  inputKey: ImbuingPriceKey;
  label: string;
};

export function ImbuingScrollCardPriceInput({
  inputKey,
  label,
  ...textFieldProps
}: ImbuingScrollCardPriceInputProps) {
  const scrollPrice = useImbuingPriceStore((s) => s.prices[inputKey]);
  const setPrice = useImbuingPriceStore((s) => s.setPrice);

  const [localValue, setLocalValue] = useState(scrollPrice ?? 0);

  useDebouncedEffect(() => setPrice(inputKey, localValue), PRICE_DEBOUNCE_MS, [localValue]);

  return (
    <TextField
      label={label}
      value={localValue}
      onChange={(e) => setLocalValue(Number(e.target.value))}
      {...textFieldProps}
    />
  );
}
