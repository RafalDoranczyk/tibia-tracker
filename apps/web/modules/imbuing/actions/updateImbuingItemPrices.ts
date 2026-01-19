"use server";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { UpdateImbuingPricesSchema } from "../schemas";
import type { ImbuingPrices } from "../types";

export async function updateImbuingItemPrices(prices: ImbuingPrices) {
  const parsed = assertZodParse(UpdateImbuingPricesSchema, {
    items: Object.entries(prices).map(([key, price]) => ({
      key,
      price,
    })),
  });

  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase
    .from("imbuing_prices")
    .upsert(parsed.items, { onConflict: "user_id, key" });

  if (error) {
    console.error(error);
    throw new Error("Failed to update imbuing item prices");
  }
}
