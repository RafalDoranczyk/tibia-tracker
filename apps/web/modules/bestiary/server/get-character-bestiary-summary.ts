import {
  CharacterBestiaryRepo,
  type CharacterBestiarySummary,
  CharacterBestiarySummarySchema,
} from "@repo/database/character-bestiary";
import { createAdminSupabaseClient } from "@repo/database/client";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireCharacterOwnership } from "@/modules/characters/server";
import { BestiaryCache } from "../cache";

async function getCachedBestiarySummary(characterId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(BestiaryCache.summary(characterId));

  const supabase = createAdminSupabaseClient();

  const { data, error } = await CharacterBestiaryRepo.getBestiarySummary(supabase, characterId);

  if (error) throw error;
  return data;
}

export async function getCharacterBestiarySummary(
  characterId: string
): Promise<CharacterBestiarySummary> {
  // We have to check ownership before using admin client to access potentially sensitive data
  await requireCharacterOwnership(characterId);

  try {
    const data = await getCachedBestiarySummary(characterId);

    const safeData = data ?? {
      character_id: characterId,
      unlocked_charm_points: 0,
      total_charm_points: 0,
      completed_soulpits: 0,
    };

    return assertZodParse(CharacterBestiarySummarySchema, safeData);
  } catch (error) {
    throwAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch character bestiary summary"
    );
  }
}
