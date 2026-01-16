import { z } from "zod";

import { IMBUING_SCROLL_ITEM_KEYS, IMBUING_SCROLL_KEYS } from "./constants";

/* =========================
 * Keys
 * ========================= */

export const ImbuingPriceKeySchema = z.union([
  z.enum(IMBUING_SCROLL_ITEM_KEYS),
  z.enum(IMBUING_SCROLL_KEYS),
]);

/* =========================
 * Fetch
 * ========================= */

export const FetchImbuItemSchema = z.object({
  key: ImbuingPriceKeySchema,
  price: z.coerce.number().nonnegative(),
});

export const FetchImbuItemListSchema = z.array(FetchImbuItemSchema);

/* =========================
 * Update
 * ========================= */

export const UpdateImbuPricesSchema = z.record(ImbuingPriceKeySchema, z.number().nonnegative());
