import { useMemo } from "react";

import { useLocalStorageState, useMounted } from "@/hooks";

import type { Scroll } from "../types";
import { calculateScrollEconomy } from "../utils";

type StoredScrollPricing = {
  scrollPrice: number;
  prices: Record<number, number>;
};

export function useScrollPricing(scroll: Scroll, tokenPrice: number) {
  const { name, items, defaultPrice, craftMethods } = scroll;

  const storageKey = `scroll-card:${name}`;
  const mounted = useMounted();

  const initialPrices = useMemo(
    () => Object.fromEntries(items.map((i) => [i.id, i.defaultPrice ?? 0])),
    [items]
  );

  const [stored, setStored] = useLocalStorageState<StoredScrollPricing>(storageKey, {
    scrollPrice: defaultPrice,
    prices: initialPrices,
  });

  const prices = useMemo(
    () => ({
      ...initialPrices,
      ...stored.prices,
    }),
    [initialPrices, stored.prices]
  );

  const setScrollPrice = (value: number) =>
    setStored((prev) => ({
      ...prev,
      scrollPrice: value,
    }));

  const setItemPrice = (itemId: number, value: number) =>
    setStored((prev) => ({
      ...prev,
      prices: {
        ...prev.prices,
        [itemId]: value,
      },
    }));

  const economy = useMemo(
    () =>
      calculateScrollEconomy({
        scroll,
        scrollPrice: stored.scrollPrice,
        itemPrices: prices,
        tokenPrice,
      }),
    [scroll, stored.scrollPrice, prices, tokenPrice]
  );

  const canCraftWithTokens = craftMethods.includes("tokens");

  return {
    scrollPrice: stored.scrollPrice,
    prices,
    setScrollPrice,
    setItemPrice,
    economy,
    canCraftWithTokens,
    ready: mounted,
  };
}
