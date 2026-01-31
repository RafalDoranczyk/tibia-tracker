import { z } from "zod";

import { PositiveInt } from "@/schemas";

import { IMBUING_SCROLL_ITEM_KEYS, IMBUING_SCROLL_KEYS } from "./constants";

export const ImbuingPriceKeySchema = z.union([
  z.enum(IMBUING_SCROLL_ITEM_KEYS),
  z.enum(IMBUING_SCROLL_KEYS),
]);
export type ImbuingPriceKey = z.infer<typeof ImbuingPriceKeySchema>;

export const ImbuingItemSchema = z.object({
  key: ImbuingPriceKeySchema,
  price: PositiveInt,
});
export type ImbuingItem = z.infer<typeof ImbuingItemSchema>;

export const UpdateImbuingPricesSchema = z.object({
  items: z.array(ImbuingItemSchema),
});

export const ImbuingFormSchema = z.record(ImbuingPriceKeySchema, z.coerce.number().nonnegative());
export type ImbuingFormValues = z.infer<typeof ImbuingFormSchema>;
