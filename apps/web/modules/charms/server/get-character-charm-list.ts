import {
  type CharacterCharmDetailed,
  CharacterCharmDetailedSchema,
  CharacterIDSchema,
  createAdminClient,
  dbGetCharacterCharms,
} from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireCharacterOwnership } from "@/modules/characters/server/require-character-ownership";
import { CharmCache } from "../cache/charms-cache";

async function getCachedCharacterCharmList(characterId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(CharmCache.characterList(characterId));

  const supabase = createAdminClient();

  const { data, error } = await dbGetCharacterCharms({ supabase, characterId });

  if (error) throw error;
  return data;
}

export async function getCharacterCharmList(payload: unknown): Promise<CharacterCharmDetailed[]> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  await requireCharacterOwnership(characterId);

  try {
    const data = await getCachedCharacterCharmList(characterId);
    return assertZodParse(CharacterCharmDetailedSchema.array(), data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch character charms");
  }
}
