import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import type { ImbuingFormValues } from "../schemas/imbuing.schema";

const INPUT_KEY = "gold_token" as const;
const DEBOUNCE_MS = 700;

export function GoldTokenInput() {
  const { setValue, getValues } = useFormContext<ImbuingFormValues>();

  const [localValue, setLocalValue] = useState<number>(getValues(INPUT_KEY) ?? 0);

  useEffect(() => {
    const id = setTimeout(() => {
      setValue(INPUT_KEY, localValue, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }, DEBOUNCE_MS);

    return () => clearTimeout(id);
  }, [localValue, setValue]);

  return (
    <TextField
      sx={{ maxWidth: 150 }}
      label="Gold Token Price"
      type="number"
      value={localValue}
      onChange={(e) => setLocalValue(Number(e.target.value))}
    />
  );
}
