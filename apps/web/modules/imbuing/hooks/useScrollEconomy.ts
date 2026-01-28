import { useFormContext, useWatch } from "react-hook-form";

import type { ImbuingFormValues, Scroll } from "../types";
import { calculateScrollEconomy } from "../utils/calculateScrollEconomy";

function hasAllRequiredPrices(scroll: Scroll, prices: Record<string, number>): boolean {
  return (
    prices.gold_token > 0 &&
    prices[scroll.key] > 0 &&
    scroll.items.every((item) => prices[item.key] > 0)
  );
}

export function useScrollEconomy(scroll: Scroll) {
  const { control } = useFormContext<ImbuingFormValues>();

  const watchedValues = useWatch({
    control,
    name: ["gold_token", scroll.key, ...scroll.items.map((i) => i.key)],
  }) as number[];

  const prices: Record<string, number> = {
    gold_token: watchedValues[0],
    [scroll.key]: watchedValues[1],
  };

  scroll.items.forEach((item, index) => {
    prices[item.key] = watchedValues[index + 2];
  });

  if (!hasAllRequiredPrices(scroll, prices)) {
    return null;
  }

  return calculateScrollEconomy({
    scroll,
    scrollPrice: prices[scroll.key],
    itemPrices: prices,
    tokenPrice: prices.gold_token,
  });
}
