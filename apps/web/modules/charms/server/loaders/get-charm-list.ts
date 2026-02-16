import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createStaticSupabaseClient } from "@/core/supabase/clients/static";
import { assertZodParse } from "@/lib/zod";
import { CharmCache } from "../../cache/charms-cache";
import { type Charm, CharmSchema } from "../../schemas";
import { dbGetCharms } from "../queries/charms";

async function getCachedCharmList() {
  "use cache";
  cacheLife("max");
  cacheTag(CharmCache.list);

  const supabase = createStaticSupabaseClient();

  const { data, error } = await dbGetCharms(supabase);

  if (error) throw error;
  return data;
}

// Fetches all charms available in the system, regardless of character progress.
export async function getCharmList(): Promise<Charm[]> {
  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedCharmList();
    return assertZodParse(CharmSchema.array(), data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch charms");
  }
}
