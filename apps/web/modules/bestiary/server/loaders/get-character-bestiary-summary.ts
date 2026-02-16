import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { createAdminClient } from "@/core/supabase/clients/admin";
import { assertZodParse } from "@/lib/zod";
import { requireCharacterOwnership } from "@/modules/characters/server";
import { BestiaryCache } from "../../cache/bestiary-cache";
import { type CharacterBestiarySummary, CharacterBestiarySummarySchema } from "../../schemas";
import { dbGetBestiarySummary } from "../queries/character_bestiary_summary";

async function getCachedBestiarySummary(characterId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(BestiaryCache.summary(characterId));

  const supabase = createAdminClient();

  const { data, error } = await dbGetBestiarySummary(supabase, characterId);

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
    console.log(error);
    throwAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch character bestiary summary"
    );
  }
}
