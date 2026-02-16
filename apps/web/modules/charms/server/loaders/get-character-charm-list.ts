import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { createAdminClient } from "@/core/supabase/clients/admin";
import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";
import { requireCharacterOwnership } from "@/modules/characters/server/guards/require-character-ownership";
import { CharmCache } from "../../cache/charms-cache";
import { type CharacterCharmDetailed, CharacterCharmDetailedSchema } from "../../schemas";
import { dbGetCharacterCharms } from "../queries/character-charms";

async function getCachedCharacterCharmList(characterId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(CharmCache.characterList(characterId));

  const supabase = createAdminClient();

  const { data, error } = await dbGetCharacterCharms(supabase, characterId);

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
