import { unstable_cache } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createStaticSupabaseClient } from "@/core/supabase/clients/static";
import { assertZodParse } from "@/lib/zod";

import { ItemCache } from "../../cache/item-cache";
import { type Item, ItemSchema } from "../../schemas";
import { dbGetItemList } from "../queries/item-list";

const getCachedItemList = unstable_cache(
  async () => {
    const supabase = createStaticSupabaseClient();
    const { data, error } = await dbGetItemList(supabase);
    if (error) throw error;
    return data;
  },
  [ItemCache.keys.items],
  {
    // Revalidate once a week
    revalidate: 604800,
    tags: [ItemCache.tags.all],
  }
);

export async function getItemList(): Promise<Item[]> {
  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedItemList();
    return assertZodParse(ItemSchema.array(), data);
  } catch (error) {
    return throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch items");
  }
}
