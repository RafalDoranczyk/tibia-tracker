import { z } from "zod";

import { NonNegativeInt } from "@/schemas";

import { IMBUING_SCROLL_ITEM_KEYS, IMBUING_SCROLL_KEYS } from "../constants";

const ScrollItemKeySchema = z.enum(IMBUING_SCROLL_ITEM_KEYS);
const ScrollKeySchema = z.enum(IMBUING_SCROLL_KEYS);

const ImbuingPriceKeySchema = z.union([ScrollItemKeySchema, ScrollKeySchema]);

export type ImbuingPriceKey = z.infer<typeof ImbuingPriceKeySchema>;

export const ImbuingItemSchema = z.object({
  key: ImbuingPriceKeySchema,
  price: NonNegativeInt,
});
export type ImbuingItem = z.infer<typeof ImbuingItemSchema>;

export const ImbuingFormSchema = z.record(ImbuingPriceKeySchema, z.coerce.number().nonnegative());
export type ImbuingFormValues = z.infer<typeof ImbuingFormSchema>;
