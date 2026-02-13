import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { type ImbuingItem, ImbuingItemSchema } from "../../schemas";
import { dbGetImbuingItemPrices } from "../queries/imbuing-prices";

export async function getImbuingItemPrices(): Promise<ImbuingItem[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetImbuingItemPrices(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch imbuing item prices");
  }

  return assertZodParse(ImbuingItemSchema.array(), data);
}
