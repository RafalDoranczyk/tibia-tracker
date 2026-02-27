import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createStaticSupabaseClient } from "@/core/supabase/clients/static";
import { assertZodParse } from "@/lib/zod";
import { HuntPlaceCache } from "./cache";
import { dbGetHuntPlaces } from "./queries";
import { type HuntPlace, HuntPlaceSchema } from "./schemas";

async function getCachedHuntPlaceList() {
  "use cache";
  cacheLife("max");
  cacheTag(HuntPlaceCache.huntPlaceList);

  const supabase = createStaticSupabaseClient();

  const { data, error, count } = await dbGetHuntPlaces(supabase);

  if (error) throw error;
  return { data, count };
}

export async function getHuntPlaceList(): Promise<HuntPlace[]> {
  await requireAuthenticatedSupabase();

  try {
    const { data } = await getCachedHuntPlaceList();
    return assertZodParse(HuntPlaceSchema.array(), data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch hunt places");
  }
}
