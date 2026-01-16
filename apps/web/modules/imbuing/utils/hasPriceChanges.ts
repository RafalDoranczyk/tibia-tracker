import type { ImbuingPriceKey, ImbuingPrices } from "../types";

export function hasPriceChanges(prices: ImbuingPrices, savedPrices: ImbuingPrices): boolean {
  for (const key in prices) {
    const k = key as ImbuingPriceKey;
    if (prices[k] !== savedPrices[k]) {
      return true;
    }
  }

  return false;
}
