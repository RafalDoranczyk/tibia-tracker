"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { type DamageElement, DamageElementSchema } from "../schemas";
import { getDamageElements } from "../server";

export async function fetchDamageElements(): Promise<DamageElement[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getDamageElements(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch damage elements");
  }

  return assertZodParse(DamageElementSchema.array(), data);
}
