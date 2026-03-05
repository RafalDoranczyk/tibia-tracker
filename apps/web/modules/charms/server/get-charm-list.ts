import { type Charm, CharmSchema, CharmsRepo } from "@repo/database/charms";
import { createStaticSupabaseClient } from "@repo/database/client";
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

  const { data, error } = await CharmsRepo.getAll(supabase);

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
