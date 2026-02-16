"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";

import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";

import { dbResetCharacterCharms, updateCharacterCharmTags } from "../server";

export async function resetCharacterCharms(payload: unknown): Promise<void> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await dbResetCharacterCharms(supabase, characterId);
  updateCharacterCharmTags(characterId);
  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to reset character charms");
  }
}
