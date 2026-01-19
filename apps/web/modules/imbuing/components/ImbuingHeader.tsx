import { Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { PageHeader } from "@/components";

import { DEFAULT_GOLD_TOKEN_PRICE, PRICE_DEBOUNCE_MS } from "../constants";
import { useImbuingPriceStore } from "../imbuingPriceStore";

export function ImbuingHeader() {
  const price = useImbuingPriceStore((s) => s.prices.gold_token);
  const setPrice = useImbuingPriceStore((s) => s.setPrice);

  const [localValue, setLocalValue] = useState(price ?? DEFAULT_GOLD_TOKEN_PRICE);

  useEffect(() => {
    if (price !== undefined) setLocalValue(price);
  }, [price]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPrice("gold_token", localValue);
    }, PRICE_DEBOUNCE_MS);

    return () => clearTimeout(t);
  }, [localValue, setPrice]);

  return (
    <Stack direction="row" alignItems="center">
      <PageHeader.Root
        title="Imbuing prices"
        description="Calculate real imbuing costs and profits based on current market prices."
      />
      <TextField
        sx={{ maxWidth: 180, ml: "auto" }}
        label="Gold Token Price"
        value={localValue}
        onChange={(e) => setLocalValue(Number(e.target.value))}
      />
    </Stack>
  );
}
