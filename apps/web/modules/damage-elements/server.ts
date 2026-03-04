import "server-only";

import {
  createStaticSupabaseClient,
  type DamageElement,
  DamageElementSchema,
  dbGetDamageElements,
} from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { DamageElementCache } from "./cache";

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
