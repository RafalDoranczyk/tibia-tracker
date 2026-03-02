"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { updateCharacterCharmTags } from "../cache/update-character-charm-tags";
import { CharacterCharmUpsertPayloadSchema } from "../schemas";
import { dbSetCharacterCharmLevel } from "../server/mutations/character-charms";

export async function setCharacterCharmLevel(payload: unknown): Promise<void> {
  const { character_id, charm_id, level } = assertZodParse(
    CharacterCharmUpsertPayloadSchema,
    payload
  );

  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await dbSetCharacterCharmLevel(supabase, character_id, charm_id, level);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to set character charm level");
  }

  updateCharacterCharmTags(character_id);
}
