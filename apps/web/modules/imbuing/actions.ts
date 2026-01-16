"use server";

import { z } from "zod";

import { getUserScopedQuery } from "@/core/supabase/getUserScopedQuery";
import { assertZodParse } from "@/utils";

import { FetchImbuItemSchema, UpdateImbuPricesSchema } from "./schemas";
import type { FetchImbuItem, ImbuingPrices } from "./types";

export async function fetchImbuItemPrices(): Promise<FetchImbuItem[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase.from("imbuing_prices").select("key, price");

  if (error) throw new Error(error.message);

  return assertZodParse(z.array(FetchImbuItemSchema), data);
}

export async function updateItemPrices(prices: ImbuingPrices) {
  const parsed = assertZodParse(UpdateImbuPricesSchema, prices);

  const { supabase } = await getUserScopedQuery();

  const rows = Object.entries(parsed).map(([key, price]) => ({
    key,
    price,
  }));

  const { error } = await supabase
    .from("imbuing_prices")
    .upsert(rows, { onConflict: "user_id,key" });

  if (error) throw new Error(error.message);
}
