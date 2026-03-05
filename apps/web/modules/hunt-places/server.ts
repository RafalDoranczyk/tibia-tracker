import "server-only";

import { createStaticSupabaseClient } from "@repo/database/client";
import { type HuntPlace, HuntPlaceSchema, HuntPlacesRepo } from "@repo/database/hunt-places";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { HuntPlaceCache } from "./cache";

async function getCachedHuntPlaceList() {
  "use cache";
  cacheLife("max");
  cacheTag(HuntPlaceCache.huntPlaceList);

  const supabase = createStaticSupabaseClient();

  const { data, error, count } = await HuntPlacesRepo.getAll(supabase);

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
