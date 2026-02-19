"use server";

import { updateTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { updateCharacterCharmTags } from "@/modules/charms/server";
import { BestiaryCache } from "../cache/bestiary-cache";
import { UpdateCharacterBestiaryPayloadSchema } from "../schemas";
import { dbUpsertCharacterBestiary } from "../server";

export async function updateCharacterBestiary(payload: unknown): Promise<void> {
  const parsed = assertZodParse(UpdateCharacterBestiaryPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();
  const { error } = await dbUpsertCharacterBestiary(supabase, parsed);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update character bestiary");
  }

  const { character_id, bestiary_class } = parsed;

  updateTag(BestiaryCache.summary(character_id));
  updateCharacterCharmTags(character_id);

  if (bestiary_class) {
    updateTag(BestiaryCache.classSummary(character_id, bestiary_class));
  }
}
