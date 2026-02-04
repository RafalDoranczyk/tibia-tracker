"use server";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { ImbuingFormSchema } from "../schemas";

export async function updateImbuingItemPrices(prices: unknown): Promise<void> {
  const parsedPrices = assertZodParse(ImbuingFormSchema, prices);

  const { userId } = await getUserScopedQuery();

  const payload = Object.entries(parsedPrices).map(([key, price]) => ({
    key,
    price,
    user_id: userId,
  }));

  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase.from("imbuing_prices").upsert(payload, {
    onConflict: "user_id, key",
  });

  if (error) {
    throw new Error("Failed to update imbuing item prices");
  }
}
