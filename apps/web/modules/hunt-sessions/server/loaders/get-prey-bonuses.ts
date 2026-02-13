import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { type PreyBonus, PreyBonusSchema } from "../../schemas";
import { dbGetPreyBonuses } from "../queries/prey-bonuses";

export async function getPreyBonuses(): Promise<PreyBonus[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetPreyBonuses(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch prey bonuses");
  }

  return assertZodParse(PreyBonusSchema.array(), data);
}
