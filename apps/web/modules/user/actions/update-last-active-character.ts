"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";

import { dbUpdateLastActiveCharacter } from "../server";

export async function updateLastActiveCharacter(payload: unknown) {
  const id = assertZodParse(CharacterIDSchema, payload);

  const { supabase, user } = await requireAuthenticatedSupabase();

  const { error } = await dbUpdateLastActiveCharacter(supabase, user.id, id);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update last active character");
  }
}
