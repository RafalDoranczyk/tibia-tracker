"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";

import { BestiaryCacheTags } from "../cache/bestiary.tags";
import { type CharacterBestiarySummary, CharacterBestiarySummarySchema } from "../schemas";
import { getBestiarySummary } from "../server";

type FetchCharacterBestiarySummaryResult = {
  data: CharacterBestiarySummary;
  cacheTag: string;
};

export async function fetchCharacterBestiarySummary(
  payload: unknown
): Promise<FetchCharacterBestiarySummaryResult> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getBestiarySummary(supabase, characterId);

  if (error) {
    throwAndLogError(
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
    data: assertZodParse(CharacterBestiarySummarySchema, safeData),
    cacheTag: BestiaryCacheTags.summary(characterId),
  };
}
