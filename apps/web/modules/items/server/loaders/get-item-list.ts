import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { type Item, ItemSchema } from "../../schemas";
import { dbGetItemList } from "../queries/item-list";

export async function getItemList(): Promise<Item[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetItemList(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch items");
  }

  return assertZodParse(ItemSchema.array(), data);
}
