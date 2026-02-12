"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { ImbuingFormSchema, type ImbuingPriceKey } from "../schemas";
import { upsertImbuingItemPrices } from "../server";

export async function updateImbuingItemPrices(payload: unknown): Promise<void> {
  const prices = assertZodParse(ImbuingFormSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const data = Object.entries(prices).map(([key, price]) => ({
    key: key as ImbuingPriceKey,
    price,
  }));

  if (data.length === 0) {
    return;
  }

  const { error } = await upsertImbuingItemPrices(supabase, data);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update imbuing item prices");
  }
}
