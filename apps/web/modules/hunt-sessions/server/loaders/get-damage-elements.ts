import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createStaticSupabaseClient } from "@/core/supabase/clients/static";
import { assertZodParse } from "@/lib/zod";
import { HuntSessionCache } from "../../cache/hunt-session-cache";
import { type DamageElement, DamageElementSchema } from "../../schemas";
import { dbGetDamageElements } from "../queries/damage-elements";

async function getCachedDamageElements() {
  "use cache";
  cacheLife("max");
  cacheTag(HuntSessionCache.damageElements);

  const supabase = createStaticSupabaseClient();

  const { data, error } = await dbGetDamageElements(supabase);

  if (error) throw error;
  return data;
}

export async function getDamageElements(): Promise<DamageElement[]> {
  await requireAuthenticatedSupabase();

  try {
    const data = await getCachedDamageElements();
    return assertZodParse(DamageElementSchema.array(), data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch damage elements");
  }
}
