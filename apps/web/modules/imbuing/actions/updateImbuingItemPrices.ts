"use server";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { UpdateImbuingPricesSchema } from "../schemas";
import type { ImbuingPrices } from "../types";

export async function updateImbuingItemPrices(prices: ImbuingPrices) {
  const { user } = await getUserScopedQuery();

  const parsed = assertZodParse(UpdateImbuingPricesSchema, {
    items: Object.entries(prices).map(([key, price]) => ({
      key,
      price,
      user_id: user.id,
    })),
  });

  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase
    .from("imbuing_prices")
    .upsert(parsed.items, { onConflict: "user_id, key" });

  if (error) {
    console.log(error);
    throw new Error("Failed to update imbuing item prices");
  }
}
