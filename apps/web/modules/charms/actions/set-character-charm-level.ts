"use server";

import { CharacterCharmSchema, CharacterCharmsRepo } from "@repo/database/character-charms";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { updateCharacterCharmTags } from "../cache/update-character-charm-tags";

export async function setCharacterCharmLevel(payload: unknown): Promise<void> {
  const { character_id, charm_id, level } = assertZodParse(CharacterCharmSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await CharacterCharmsRepo.setLevel(supabase, {
    characterId: character_id,
    charmId: charm_id,
    level,
  });

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to set character charm level");
  }

  updateCharacterCharmTags(character_id);
}
