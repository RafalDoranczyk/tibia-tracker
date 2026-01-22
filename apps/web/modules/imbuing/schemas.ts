import { z } from "zod";

import { PositiveNumber } from "@/schemas/shared";

import { IMBUING_SCROLL_ITEM_KEYS, IMBUING_SCROLL_KEYS } from "./constants";

export const ImbuingPriceKeySchema = z.union([
  z.enum(IMBUING_SCROLL_ITEM_KEYS),
  z.enum(IMBUING_SCROLL_KEYS),
]);

export const ImbuingItemSchema = z.object({
  key: ImbuingPriceKeySchema,
  price: PositiveNumber,
});

export const UpdateImbuingPricesSchema = z.object({
  items: z.array(ImbuingItemSchema),
});
