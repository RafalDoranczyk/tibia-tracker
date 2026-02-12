"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { type PreyBonus, PreyBonusSchema } from "../schemas";
import { getPreyBonuses } from "../server";

export async function fetchPreyBonuses(): Promise<PreyBonus[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getPreyBonuses(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch prey bonuses");
  }

  return assertZodParse(PreyBonusSchema.array(), data);
}
