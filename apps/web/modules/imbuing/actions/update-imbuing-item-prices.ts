"use server";

import { type ImbuingPriceKey, ImbuingPricesRepo } from "@repo/database/imbuing-prices";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { updateTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { ImbuingCache } from "../cache";
import { ImbuingFormSchema } from "../schemas";

export async function updateImbuingItemPrices(payload: unknown): Promise<void> {
  const parsed = assertZodParse(ImbuingFormSchema, payload);

  const { supabase, user } = await requireAuthenticatedSupabase();

  const prices = Object.entries(parsed).map(([key, price]) => ({
    key: key as ImbuingPriceKey,
    price,
  }));

  if (prices.length === 0) {
    return;
  }

  const { error } = await ImbuingPricesRepo.upsertBatch(supabase, prices);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update imbuing item prices");
  }

  updateTag(ImbuingCache.imbuingPrices(user.id));
}
