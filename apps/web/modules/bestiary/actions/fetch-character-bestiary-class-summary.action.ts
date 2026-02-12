"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { BestiaryCacheTags } from "../cache/bestiary.tags";
import {
  CharacterBestiaryClassRequestSchema,
  type CharacterBestiaryClassSummary,
  CharacterBestiaryClassSummarySchema,
} from "../schemas";
import { getBestiaryClassSummary } from "../server";

type FetchCharacterBestiaryClassSummaryResult = {
  data: CharacterBestiaryClassSummary;
  cacheTag: string;
};

export async function fetchCharacterBestiaryClassSummary(
  payload: unknown
): Promise<FetchCharacterBestiaryClassSummaryResult> {
  const { characterId, bestiaryClass } = assertZodParse(
    CharacterBestiaryClassRequestSchema,
    payload
  );

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getBestiaryClassSummary(supabase, { characterId, bestiaryClass });

  if (error) {
    throwAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch character bestiary class summary"
    );
  }

  const safeData = data ?? {
    character_id: characterId,
    bestiary_class: bestiaryClass,
    total_monsters: 0,
    completed_monsters: 0,
    completed_soulpits: 0,
    total_charm_points: 0,
    unlocked_charm_points: 0,
  };

  return {
    data: assertZodParse(CharacterBestiaryClassSummarySchema, safeData),
    cacheTag: BestiaryCacheTags.classSummary(characterId, bestiaryClass),
  };
}
