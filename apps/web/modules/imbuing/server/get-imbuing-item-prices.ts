import { createAdminSupabaseClient } from "@repo/database/client";
import {
  type ImbuingItem,
  ImbuingItemSchema,
  ImbuingPricesRepo,
} from "@repo/database/imbuing-prices";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { ImbuingCache } from "../cache";

async function getCachedImbuingItemPrices(userId: string) {
  "use cache";
  cacheLife("days");
  cacheTag(ImbuingCache.imbuingPrices(userId));

  const supabase = createAdminSupabaseClient();

  const { data, error } = await ImbuingPricesRepo.getList(supabase, userId);

  if (error) throw error;
  return data;
}

export async function getImbuingItemPrices(): Promise<ImbuingItem[]> {
  const { user } = await requireAuthenticatedSupabase();

  try {
    const data = await getCachedImbuingItemPrices(user.id);

    return assertZodParse(ImbuingItemSchema.array(), data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch imbuing item prices");
  }
}
