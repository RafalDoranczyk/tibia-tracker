import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { type DamageElement, DamageElementSchema } from "../../schemas";
import { dbGetDamageElements } from "../queries/damage-elements";

export async function getDamageElements(): Promise<DamageElement[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetDamageElements(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch damage elements");
  }

  return assertZodParse(DamageElementSchema.array(), data);
}
