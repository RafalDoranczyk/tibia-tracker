import { useFormContext, useWatch } from "react-hook-form";

import type { ImbuingFormValues, ImbuingPriceKey, ImbuingPrices, ImbuingScroll } from "../schemas";
import { calculateScrollEconomy } from "../utils/calculateScrollEconomy";

type PriceMap = Partial<Record<ImbuingPriceKey, number>>;

function hasAllRequiredPrices(scroll: ImbuingScroll, prices: PriceMap): prices is ImbuingPrices {
  const tokenPrice = prices.gold_token;
  if (tokenPrice === undefined || tokenPrice <= 0) {
    return false;
  }

  const scrollPrice = prices[scroll.key];
  if (scrollPrice === undefined || scrollPrice <= 0) {
    return false;
  }

  return scroll.items.every((item) => {
    const itemPrice = prices[item.key];
    return itemPrice !== undefined && itemPrice > 0;
  });
}

export function useScrollEconomy(scroll: ImbuingScroll) {
  const { control } = useFormContext<ImbuingFormValues>();

  const keys: ImbuingPriceKey[] = ["gold_token", scroll.key, ...scroll.items.map((i) => i.key)];

  const watchedValues = useWatch({
    control,
    name: keys,
  }) as number[];

  const prices: PriceMap = {};

  keys.forEach((key, index) => {
    prices[key] = watchedValues[index];
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
