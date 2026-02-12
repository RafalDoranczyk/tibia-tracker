"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { FetchHuntSessionPayloadSchema, type HuntSession, HuntSessionSchema } from "../schemas";
import { getHuntSession } from "../server";

export async function fetchHuntSession(payload: unknown): Promise<HuntSession | null> {
  const { id, character_id } = assertZodParse(FetchHuntSessionPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getHuntSession(supabase, { character_id, id });

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch hunt session");
  }

  if (!data) {
    return null;
  }

  return assertZodParse(HuntSessionSchema, data);
}
