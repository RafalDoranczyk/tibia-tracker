import { type Charm, CharmSchema, createStaticSupabaseClient, dbGetCharms } from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { CharmCache } from "../cache/charms-cache";

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
