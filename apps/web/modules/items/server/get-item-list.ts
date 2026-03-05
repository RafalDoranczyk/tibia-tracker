import { createStaticSupabaseClient } from "@repo/database/client";
import { type Item, ItemSchema, ItemsRepo } from "@repo/database/items";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { ItemsCache } from "../cache";

async function getCachedItemList() {
  "use cache";
  cacheLife("max");
  cacheTag(ItemsCache.items);
  const supabase = createStaticSupabaseClient();

  const { data, error } = await ItemsRepo.getAll(supabase);

  if (error) throw error;

  return data;
}

export async function getItemList(): Promise<Item[]> {
  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedItemList();

    return assertZodParse(ItemSchema.array(), data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch items");
  }
}
