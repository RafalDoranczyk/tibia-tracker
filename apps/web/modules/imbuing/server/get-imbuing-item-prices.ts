import {
  createAdminClient,
  dbGetImbuingItemPrices,
  type ImbuingItem,
  ImbuingItemSchema,
} from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { ImbuingCache } from "../cache";

async function getCachedImbuingItemPrices(userId: string) {
  "use cache";
  cacheLife("days");
  cacheTag(ImbuingCache.imbuingPrices(userId));

  const supabase = createAdminClient();

  const { data, error } = await dbGetImbuingItemPrices(supabase, userId);

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
