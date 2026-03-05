import {
  type CharacterCharmEconomy,
  CharacterCharmEconomySchema,
  CharacterIDSchema,
  createAdminClient,
  dbGetCharacterCharmEconomy,
} from "@repo/database";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireCharacterOwnership } from "@/modules/characters/server";
import { CharmCache } from "../cache/charms-cache";

async function getCachedCharacterCharmsEconomy(characterId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(CharmCache.characterEconomy(characterId));

  const supabase = createAdminClient();

  const { data, error } = await dbGetCharacterCharmEconomy({ supabase, characterId });

  if (error) throw error;
  return data;
}

export async function getCharacterCharmsEconomy(payload: unknown): Promise<CharacterCharmEconomy> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  await requireCharacterOwnership(characterId);

  try {
    const data = await getCachedCharacterCharmsEconomy(characterId);

    return assertZodParse(CharacterCharmEconomySchema, data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch character charm economy");
  }
}
