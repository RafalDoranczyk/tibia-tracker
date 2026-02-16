import { cacheLife, cacheTag } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createStaticSupabaseClient } from "@/core/supabase/clients/static";
import { assertZodParse } from "@/lib/zod";
import { type Monster, MonsterSchema } from "@/modules/bestiary";

import { HuntSessionCache } from "../../cache/hunt-session-cache";
import { dbGetMonsterList } from "../queries/monsters";

async function getCachedMonsters() {
  "use cache";
  cacheLife("max");
  cacheTag(HuntSessionCache.monsters);

  const supabase = createStaticSupabaseClient();

  const { data, error } = await dbGetMonsterList(supabase);

  if (error) throw error;
  return data;
}

export async function getMonsterList(): Promise<Monster[]> {
  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedMonsters();
    return assertZodParse(MonsterSchema.array(), data);
  } catch (error) {
    return throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch monsters");
  }
}
