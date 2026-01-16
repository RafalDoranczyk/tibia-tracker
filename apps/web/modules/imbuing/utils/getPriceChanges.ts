import type { ImbuingPriceKey, ImbuingPrices } from "../types";

export function getPriceChanges(prices: ImbuingPrices, savedPrices: ImbuingPrices): ImbuingPrices {
  const changes: ImbuingPrices = {};

  for (const key in prices) {
    const k = key as ImbuingPriceKey;
    const current = prices[k];
    const saved = savedPrices[k];

    if (current !== undefined && current !== saved) {
      changes[k] = current;
    }
  }

  return changes;
}
