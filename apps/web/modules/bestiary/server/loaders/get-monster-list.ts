import { unstable_cache } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import type { TypedSupabaseClient } from "@/core/supabase/types";
import { assertZodParse } from "@/lib/zod";

import { type Monster, MonsterSchema } from "../../schemas";
import { dbGetMonsterList } from "../queries/monsters";

const getCachedMonsters = unstable_cache(
  async (supabase: TypedSupabaseClient) => {
    const { data, error } = await dbGetMonsterList(supabase);

    if (error) {
      throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch monsters");
    }

    return assertZodParse(MonsterSchema.array(), data);
  },
  ["monster-list-all"], // Klucz cache
  {
    revalidate: 86400,
    tags: ["monsters"], // Tag do ewentualnego czyszczenia cache'u ręcznie
  }
);

export async function getMonsterList(): Promise<Monster[]> {
  // Autoryzację zostawiamy na zewnątrz cache'u!
  // Chcemy, żeby system zawsze sprawdzał uprawnienia przed wydaniem danych z pamięci.
  const { supabase } = await requireAuthenticatedSupabase();

  return getCachedMonsters(supabase);
}
