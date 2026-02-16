import { cacheLife, cacheTag } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createStaticSupabaseClient } from "@/core/supabase/clients/static";
import { assertZodParse } from "@/lib/zod";

import { ItemCache } from "../../cache/item-cache";
import { type ItemPreview, ItemPreviewSchema } from "../../schemas";
import { dbGetSupplyList } from "../queries/supply-list";

async function getCachedSupplyList() {
  "use cache";
  cacheLife("max");
  cacheTag(ItemCache.supplies);
  const supabase = createStaticSupabaseClient();

  const { data, error } = await dbGetSupplyList(supabase);

  if (error) throw error;
  return data;
}

export async function getSupplyList(): Promise<ItemPreview[]> {
  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedSupplyList();
    return assertZodParse(ItemPreviewSchema.array(), data);
  } catch (error) {
    return throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch supplies");
  }
}
