"use server";

import { updateTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { ImbuingCache } from "../cache/imbuing-cache";
import { ImbuingFormSchema, type ImbuingPriceKey } from "../schemas";
import { dbUpsertImbuingItemPrices } from "../server";

export async function updateImbuingItemPrices(payload: unknown): Promise<void> {
  const prices = assertZodParse(ImbuingFormSchema, payload);

  const { supabase, user } = await requireAuthenticatedSupabase();

  const data = Object.entries(prices).map(([key, price]) => ({
    key: key as ImbuingPriceKey,
    price,
  }));

  if (data.length === 0) {
    return;
  }

  const { error } = await dbUpsertImbuingItemPrices(supabase, data);

  updateTag(ImbuingCache.imbuingPrices(user.id));

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update imbuing item prices");
  }
}
