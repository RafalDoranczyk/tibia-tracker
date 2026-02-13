import { z } from "zod";

import type { Tables } from "@/core/supabase/types";
import { NonNegativeInt } from "@/lib/zod";

import { ImbuingPriceKeySchema } from "./imbuing-keys.schema";

export const ImbuingItemSchema = z.object({
  key: ImbuingPriceKeySchema,
  price: NonNegativeInt,
}) satisfies z.ZodType<Omit<Tables<"imbuing_prices">, "user_id">>;

export type ImbuingItem = z.infer<typeof ImbuingItemSchema>;
