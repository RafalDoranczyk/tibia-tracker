"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";

import { BestiaryCacheTags } from "../cacheTags";
import { CharacterBestiarySummarySchema } from "../schemas";
import { getCharacterBestiarySummaryQuery } from "../server/queries/bestiarySummary.query";

export async function fetchCharacterBestiarySummary(characterId: string) {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getCharacterBestiarySummaryQuery(supabase, characterId);

  if (error) {
    throw wrapAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch character bestiary summary"
    );
  }

  const safeData = data ?? {
    character_id: characterId,
    unlocked_charm_points: 0,
    total_charm_points: 0,
    completed_soulpits: 0,
  };

  return {
    data: CharacterBestiarySummarySchema.parse(safeData),
    cacheTag: BestiaryCacheTags.summary(characterId),
  };
}
