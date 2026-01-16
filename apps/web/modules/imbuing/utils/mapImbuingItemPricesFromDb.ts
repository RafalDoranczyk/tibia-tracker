import type { FetchImbuItem, ImbuingPrices } from "../types";

export function mapImbuingItemPricesFromDb(rows: FetchImbuItem[]): ImbuingPrices {
  return Object.fromEntries(rows.map((row) => [row.key, row.price]));
}
