"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { ImbuingFormSchema } from "../schemas/imbuing.schema";

export async function updateImbuingItemPrices(prices: unknown): Promise<void> {
  const parsedPrices = assertZodParse(ImbuingFormSchema, prices);

  const { supabase, userId } = await requireAuthenticatedSupabase();

  const payload = Object.entries(parsedPrices).map(([key, price]) => ({
    key,
    price,
    user_id: userId,
  }));

  if (payload.length === 0) {
    return; // Nothing to update
  }

  const { error } = await supabase.from("imbuing_prices").upsert(payload, {
    onConflict: "user_id,key",
  });

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update imbuing item prices");
  }
}
