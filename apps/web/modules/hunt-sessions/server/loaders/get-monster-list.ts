import { unstable_cache } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createStaticSupabaseClient } from "@/core/supabase/clients/static";
import { assertZodParse } from "@/lib/zod";
import { type Monster, MonsterSchema } from "@/modules/bestiary";

import { HuntSessionCache } from "../../cache/hunt-session-cache";
import { dbGetMonsterList } from "../queries/monsters";

const getCachedMonsters = unstable_cache(
  async () => {
    const supabase = createStaticSupabaseClient();
    const { data, error } = await dbGetMonsterList(supabase);

    if (error) throw error;
    return data;
  },
  [HuntSessionCache.keys.monsters],

  // Revalidate once a week
  { revalidate: 604800, tags: [HuntSessionCache.tags.monsters] }
);

export async function getMonsterList(): Promise<Monster[]> {
  await requireAuthenticatedSupabase();
  console.log("fefe");

  try {
    const data = await getCachedMonsters();
    return assertZodParse(MonsterSchema.array(), data);
  } catch (error) {
    return throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch monsters");
  }
}
