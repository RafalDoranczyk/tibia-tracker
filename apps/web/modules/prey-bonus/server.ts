import "server-only";

import { createStaticSupabaseClient } from "@repo/database/client";
import { type PreyBonus, PreyBonusesRepo, PreyBonusSchema } from "@repo/database/prey-bonuses";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { PreyBonusCache } from "./cache";

async function getCachedPreyBonuses() {
  "use cache";
  cacheLife("max");
  cacheTag(PreyBonusCache);

  const supabase = createStaticSupabaseClient();

  const { data, error } = await PreyBonusesRepo.getAll(supabase);

  if (error) throw error;
  return data;
}

export async function getPreyBonuses(): Promise<PreyBonus[]> {
  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedPreyBonuses();

    return assertZodParse(PreyBonusSchema.array(), data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch prey bonuses");
  }
}
