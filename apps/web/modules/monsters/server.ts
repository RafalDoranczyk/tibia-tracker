import "server-only";

import { createStaticSupabaseClient } from "@repo/database/client";
import { type Monster, MonsterSchema, MonstersRepo } from "@repo/database/monsters";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { MonsterListCache } from "./cache";

async function getCachedMonsters() {
  "use cache";
  cacheLife("max");
  cacheTag(MonsterListCache);

  const supabase = createStaticSupabaseClient();

  const { data, error } = await MonstersRepo.getAll(supabase);

  if (error) throw error;
  return data;
}

export async function getMonsterList(): Promise<Monster[]> {
  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedMonsters();
    return assertZodParse(MonsterSchema.array(), data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch monsters");
  }
}
