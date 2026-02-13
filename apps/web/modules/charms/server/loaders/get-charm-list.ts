import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { type Charm, CharmSchema } from "../../schemas";
import { dbGetCharms } from "../queries/charms";

// Fetches all charms available in the system, regardless of character progress.
export async function getCharmList(): Promise<Charm[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetCharms(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch charms");
  }
  return assertZodParse(CharmSchema.array(), data);
}
