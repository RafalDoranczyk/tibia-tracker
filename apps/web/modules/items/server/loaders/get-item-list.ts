import { cacheLife, cacheTag } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createStaticSupabaseClient } from "@/core/supabase/clients/static";
import { assertZodParse } from "@/lib/zod";

import { ItemCache } from "../../cache/item-cache";
import { type Item, ItemSchema } from "../../schemas";
import { dbGetItemList } from "../queries/item-list";

async function getCachedItemList() {
  "use cache";
  cacheLife("max");
  cacheTag(ItemCache.items);
  const supabase = createStaticSupabaseClient();

  const { data, error } = await dbGetItemList(supabase);

  if (error) throw error;
  return data;
}

export async function getItemList(): Promise<Item[]> {
  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedItemList();
    return assertZodParse(ItemSchema.array(), data);
  } catch (error) {
    return throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch items");
  }
}
