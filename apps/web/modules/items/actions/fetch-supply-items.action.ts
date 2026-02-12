"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { type ItemPreview, ItemPreviewSchema } from "../schemas/db/item.schema";
import { getSupplies } from "../server";

export async function fetchSupplies(): Promise<ItemPreview[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getSupplies(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch supplies");
  }

  return assertZodParse(ItemPreviewSchema.array(), data);
}
