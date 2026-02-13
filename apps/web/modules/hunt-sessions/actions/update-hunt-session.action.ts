"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import {
  type HuntSessionDbFields,
  HuntSessionDbFieldsSchema,
  UpdateHuntSessionPayloadSchema,
} from "../schemas";
import { updateHuntSession as mutation } from "../server";

export async function updateHuntSession(payload: unknown): Promise<HuntSessionDbFields> {
  const parsed = assertZodParse(UpdateHuntSessionPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await mutation(supabase, parsed);

  if (error || !data) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update hunt session");
  }

  return assertZodParse(HuntSessionDbFieldsSchema, data);
}
