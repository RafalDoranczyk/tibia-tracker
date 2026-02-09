"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error/";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { BestiaryCacheTags } from "../cacheTags";
import {
  type BestiaryClass,
  BestiaryClassSchema,
  CharacterBestiaryClassSummarySchema,
} from "../schemas";
import { bestiaryClassSummaryQuery } from "../server/queries/bestiaryClassSummary.query";

export async function fetchCharacterBestiaryClassSummary(
  characterId: string,
  bestiaryClass: BestiaryClass
) {
  const parsedBestiaryClass = assertZodParse(BestiaryClassSchema, bestiaryClass);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await bestiaryClassSummaryQuery(
    supabase,
    characterId,
    parsedBestiaryClass
  );

  if (error) {
    throw wrapAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch character bestiary class summary"
    );
  }

  const safeData = data ?? {
    character_id: characterId,
    bestiary_class: parsedBestiaryClass,
    total_monsters: 0,
    completed_monsters: 0,
    completed_soulpits: 0,
    total_charm_points: 0,
    unlocked_charm_points: 0,
  };

  return {
    data: CharacterBestiaryClassSummarySchema.parse(safeData),
    cacheTag: BestiaryCacheTags.classSummary(characterId, parsedBestiaryClass),
  };
}
