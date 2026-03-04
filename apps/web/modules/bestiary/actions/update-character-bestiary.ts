"use server";

import { dbUpsertCharacterBestiary } from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { updateTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { updateCharacterCharmTags } from "@/modules/charms";
import { BestiaryCache } from "../cache";
import { UpdateCharacterBestiaryPayloadSchema } from "../schemas";

export async function updateCharacterBestiary(payload: unknown): Promise<void> {
  const parsed = assertZodParse(UpdateCharacterBestiaryPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();
  const { error } = await dbUpsertCharacterBestiary({ supabase, payload: parsed });

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update character bestiary");
  }

  const { character_id, monster_class } = parsed;

  updateTag(BestiaryCache.summary(character_id));
  updateCharacterCharmTags(character_id);

  if (monster_class) {
    updateTag(BestiaryCache.classSummary(character_id, monster_class));
  }
}
