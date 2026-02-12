"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { type ImbuingItem, ImbuingItemSchema } from "../schemas";
import { getImbuingItemPrices } from "../server";

export async function fetchImbuingItemPrices(): Promise<ImbuingItem[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getImbuingItemPrices(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch imbuing item prices");
  }

  return assertZodParse(ImbuingItemSchema.array(), data);
}
