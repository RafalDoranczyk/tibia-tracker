"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import {
  CreateHuntSessionPayloadSchema,
  type HuntSessionDbFields,
  HuntSessionDbFieldsSchema,
} from "../schemas";
import { insertHuntSession } from "../server";

export async function createHuntSession(payload: unknown): Promise<HuntSessionDbFields> {
  const parsed = assertZodParse(CreateHuntSessionPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await insertHuntSession(supabase, parsed);

  if (error || !data) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to create hunt session");
  }

  return assertZodParse(HuntSessionDbFieldsSchema, data);
}
