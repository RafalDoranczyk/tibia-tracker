"use server";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { ImbuingPriceKeySchema, UpdateImbuingPricesSchema } from "../schemas";

export async function updateImbuingItemPrices(prices: unknown): Promise<void> {
  const parsedPrices = assertZodParse(ImbuingPriceKeySchema, prices);

  const { user } = await getUserScopedQuery();

  const payload = {
    items: Object.entries(parsedPrices).map(([key, price]) => ({
      key,
      price,
      user_id: user.id,
    })),
  };

  const parsed = assertZodParse(UpdateImbuingPricesSchema, payload);

  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase.from("imbuing_prices").upsert(parsed.items, {
    onConflict: "user_id, key",
  });

  if (error) {
    throw new Error("Failed to update imbuing item prices");
  }
}
