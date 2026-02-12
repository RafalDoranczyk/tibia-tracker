"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { type Item, ItemSchema } from "../schemas/db/item.schema";
import { getItemList } from "../server";

export async function fetchItems(): Promise<Item[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getItemList(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch items");
  }

  return assertZodParse(ItemSchema.array(), data);
}
