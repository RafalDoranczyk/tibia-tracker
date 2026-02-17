import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createStaticSupabaseClient } from "@/core/supabase/clients/static";
import { assertZodParse } from "@/lib/zod";
import { HuntSessionCache } from "../../cache/hunt-session-cache";
import { type PreyBonus, PreyBonusSchema } from "../../schemas";
import { dbGetPreyBonuses } from "../queries/prey-bonuses";

async function getCachedPreyBonuses() {
  "use cache";
  cacheLife("max");
  cacheTag(HuntSessionCache.preyBonuses);

  const supabase = createStaticSupabaseClient();

  const { data, error } = await dbGetPreyBonuses(supabase);

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
