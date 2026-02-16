import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { createAdminClient } from "@/core/supabase/clients/admin";
import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";
import { requireCharacterOwnership } from "@/modules/characters/server";
import { CharmCache } from "../../cache/charms-cache";
import { type CharacterCharmEconomy, CharacterCharmEconomySchema } from "../../schemas";
import { dbGetCharacterCharmEconomy } from "../queries/character-charm-economy";

async function getCachedCharacterCharmsEconomy(characterId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(CharmCache.characterEconomy(characterId));

  const supabase = createAdminClient();

  const { data, error } = await dbGetCharacterCharmEconomy(supabase, characterId);

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
