import { useMemo } from "react";
import { useShallow } from "zustand/shallow";

import { useImbuingPriceStore } from "../imbuingPriceStore";
import type { ImbuingPrices, Scroll } from "../types";
import { calculateScrollEconomy } from "../utils/calculateScrollEconomy";

function selectPricesForScroll(scroll: Scroll, prices: ImbuingPrices) {
  const result: Record<string, number | undefined> = {
    gold_token: prices.gold_token,
    [scroll.key]: prices[scroll.key],
  };

  for (const item of scroll.items) {
    result[item.key] = prices[item.key];
  }

  return result;
}

function hasAllRequiredPrices(scroll: Scroll, prices: ImbuingPrices): boolean {
  const scrollPrice = prices[scroll.key];
  if (typeof scrollPrice !== "number" || scrollPrice <= 0) {
    return false;
  }

  return scroll.items.every((item) => {
    const price = prices[item.key];
    return typeof price === "number" && price > 0;
  });
}

export function hasScrollPriceChanges(
  scroll: Scroll,
  prices: ImbuingPrices,
  savedPrices: ImbuingPrices
) {
  const current = selectPricesForScroll(scroll, prices);
  const saved = selectPricesForScroll(scroll, savedPrices);

  return Object.keys(current).some((key) => current[key] !== saved[key]);
}

export function useScrollPricing(scroll: Scroll) {
  const prices = useImbuingPriceStore(useShallow((s) => selectPricesForScroll(scroll, s.prices)));

  const tokenPrice = prices.gold_token ?? 0;
  const scrollPrice = prices[scroll.key] ?? 0;

  // console.log(scroll);

  const hasAllPrices = useMemo(() => hasAllRequiredPrices(scroll, prices), [scroll, prices]);

  const economy = useMemo(() => {
    if (!hasAllPrices) return null;

    return calculateScrollEconomy({
      scroll,
      scrollPrice,
      itemPrices: prices,
      tokenPrice,
    });
  }, [hasAllPrices, scroll, scrollPrice, prices, tokenPrice]);

  return { hasAllPrices, economy };
}
