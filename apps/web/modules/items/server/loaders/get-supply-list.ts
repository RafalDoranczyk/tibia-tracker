import { unstable_cache } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createStaticSupabaseClient } from "@/core/supabase/clients/static";
import { assertZodParse } from "@/lib/zod";

import { ItemCache } from "../../cache/item-cache";
import { type ItemPreview, ItemPreviewSchema } from "../../schemas";
import { dbGetSupplyList } from "../queries/supply-list";

const getCachedSupplyList = unstable_cache(
  async () => {
    const supabase = createStaticSupabaseClient();
    const { data, error } = await dbGetSupplyList(supabase);

    if (error) throw error;
    return data;
  },
  [ItemCache.keys.supplies],
  {
    // Revalidate once a week
    revalidate: 604800,
    tags: [ItemCache.tags.supplies],
  }
);

export async function getSupplyList(): Promise<ItemPreview[]> {
  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedSupplyList();
    return assertZodParse(ItemPreviewSchema.array(), data);
  } catch (error) {
    return throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch supplies");
  }
}
