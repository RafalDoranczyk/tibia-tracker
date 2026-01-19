import { z } from "zod";

import { IMBUING_SCROLL_ITEM_KEYS, IMBUING_SCROLL_KEYS } from "./constants";

export const ImbuingPriceKeySchema = z.union([
  z.enum(IMBUING_SCROLL_ITEM_KEYS),
  z.enum(IMBUING_SCROLL_KEYS),
]);

export const ImbuingItemSchema = z.object({
  key: z.string(),
  price: z.number(),
});

export const UpdateImbuingPricesSchema = z.object({
  items: z.array(
    z.object({
      key: z.string(),
      price: z.number(),
    })
  ),
});

export const ImbuingItemListSchema = z.array(ImbuingItemSchema);
