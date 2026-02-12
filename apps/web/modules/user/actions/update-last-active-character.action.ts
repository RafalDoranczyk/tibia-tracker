"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";

import { updateLastActiveCharacter as mutation } from "../server";

export async function updateLastActiveCharacter(payload: unknown) {
  const id = assertZodParse(CharacterIDSchema, payload);

  const { supabase, userId } = await requireAuthenticatedSupabase();

  const { error } = await mutation(supabase, userId, id);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update last active character");
  }
}
