import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createAdminClient } from "@/core/supabase/clients/admin";
import { assertZodParse } from "@/lib/zod";
import { ImbuingCache } from "../../cache/imbuing-cache";
import { type ImbuingItem, ImbuingItemSchema } from "../../schemas";
import { dbGetImbuingItemPrices } from "../queries/imbuing-prices";

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
    return throwAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch imbuing item prices"
    );
  }
}
