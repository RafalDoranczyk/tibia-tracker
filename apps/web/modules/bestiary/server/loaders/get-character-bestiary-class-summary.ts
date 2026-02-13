import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import {
  CharacterBestiaryClassRequestSchema,
  type CharacterBestiaryClassSummary,
  CharacterBestiaryClassSummarySchema,
} from "../../schemas";
import { dbGetBestiaryClassSummary } from "../queries/character-bestiary-class-summary";

export async function getCharacterBestiaryClassSummary(
  payload: unknown
): Promise<CharacterBestiaryClassSummary> {
  const { characterId, bestiaryClass } = assertZodParse(
    CharacterBestiaryClassRequestSchema,
    payload
  );

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetBestiaryClassSummary(supabase, { characterId, bestiaryClass });

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

  return assertZodParse(CharacterBestiaryClassSummarySchema, safeData);
}
