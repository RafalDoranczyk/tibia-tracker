import { createStaticSupabaseClient } from "@repo/database/client";
import { type ItemPreview, ItemPreviewSchema } from "@repo/database/items";
import { SuppliesRepo } from "@repo/database/supplies";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { ItemsCache } from "../cache";

async function getCachedSupplyList() {
  "use cache";
  cacheLife("max");
  cacheTag(ItemsCache.supplies);
  const supabase = createStaticSupabaseClient();

  const { data, error } = await SuppliesRepo.getAll(supabase);

  if (error) throw error;

  return data;
}

export async function getSupplyList(): Promise<ItemPreview[]> {
  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedSupplyList();
    return assertZodParse(ItemPreviewSchema.array(), data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch supplies");
  }
}
