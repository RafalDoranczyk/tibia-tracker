import type { ImbuingItem, ImbuingPrices } from "../types";

export function mapImbuingItemPricesFromDb(rows: ImbuingItem[]): ImbuingPrices {
  return Object.fromEntries(rows.map((row) => [row.key, row.price]));
}
