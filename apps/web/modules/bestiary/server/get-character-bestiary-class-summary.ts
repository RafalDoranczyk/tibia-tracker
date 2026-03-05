import {
  type CharacterBestiaryClassSummary,
  CharacterBestiaryClassSummarySchema,
  createAdminClient,
  dbGetBestiaryClassSummary,
} from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireCharacterOwnership } from "@/modules/characters/server";
import { BestiaryCache } from "../cache";
import {
  type FetchCharacterBestiaryClassSummaryPayload,
  FetchCharacterBestiaryClassSummaryPayloadSchema,
} from "../schemas";

async function getCachedBestiaryClassSummary({
  characterId,
  bestiaryClass,
}: FetchCharacterBestiaryClassSummaryPayload) {
  "use cache";
  cacheLife("hours");
  cacheTag(BestiaryCache.classSummary(characterId, bestiaryClass));

  const supabase = createAdminClient();

  const { data, error } = await dbGetBestiaryClassSummary({
    supabase,
    characterId,
    bestiaryClass,
  });

  if (error) throw error;
  return data;
}

export async function getCharacterBestiaryClassSummary(
  payload: unknown
): Promise<CharacterBestiaryClassSummary> {
  const { characterId, bestiaryClass } = assertZodParse(
    FetchCharacterBestiaryClassSummaryPayloadSchema,
    payload
  );

  await requireCharacterOwnership(characterId);

  try {
    const data = await getCachedBestiaryClassSummary({
      characterId,
      bestiaryClass,
    });

    const safeData = data ?? {
      character_id: characterId,
      monster_class: bestiaryClass,
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
