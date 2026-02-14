import { unstable_cache } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createAdminClient } from "@/core/supabase/clients/admin";
import { assertZodParse } from "@/lib/zod";

import { BestiaryCache } from "../../cache/bestiary-cache";
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

  await requireAuthenticatedSupabase();

  try {
    const getCachedData = unstable_cache(
      async () => {
        const supabase = createAdminClient();

        const { data, error } = await dbGetBestiaryClassSummary(supabase, {
          characterId,
          bestiaryClass,
        });

        if (error) throw error;

        return data;
      },
      [BestiaryCache.keys.classSummary, characterId, bestiaryClass],
      {
        tags: [BestiaryCache.tags.classSummary(characterId, bestiaryClass)],
        revalidate: 86400, // 24h
      }
    );

    const data = await getCachedData();

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
  } catch (error) {
    throwAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch character bestiary class summary"
    );
  }
}
