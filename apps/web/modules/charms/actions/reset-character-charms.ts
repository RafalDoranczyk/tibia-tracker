"use server";

import { CharacterCharmsRepo } from "@repo/database/character-charms";
import { CharacterIDSchema } from "@repo/database/characters";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { updateCharacterCharmTags } from "../cache/update-character-charm-tags";

export async function resetCharacterCharms(payload: unknown): Promise<void> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await CharacterCharmsRepo.resetAll(supabase, characterId);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to reset character charms");
  }

  updateCharacterCharmTags(characterId);
}
