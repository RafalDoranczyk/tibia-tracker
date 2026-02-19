import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createStaticSupabaseClient } from "@/core/supabase/clients/static";
import { assertZodParse } from "@/lib/zod";
import { type DamageElement, DamageElementSchema } from "@/modules/damage-elements";
import { DamageElementCache } from "./cache";
import { dbGetDamageElements } from "./queries";

async function getCachedDamageElements() {
  "use cache";
  cacheLife("max");
  cacheTag(DamageElementCache);

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
