import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { type ItemPreview, ItemPreviewSchema } from "../../schemas";
import { dbGetSupplyList } from "../queries/supply-list";

export async function getSupplyList(): Promise<ItemPreview[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetSupplyList(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch supplies");
  }

  return assertZodParse(ItemPreviewSchema.array(), data);
}
