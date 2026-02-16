import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { tibiaDataClient } from "@/lib/tibia-data";
import { CharactersCache } from "../../cache/characters-cache";

async function getCachedCharacterData(name: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(CharactersCache.byName(name));

  const response = await tibiaDataClient.getCharacter(name);

  if (!response?.character?.character?.name) {
    return null;
  }

  return {
    ...response.character,
    _cachedAt: new Date().toISOString(),
  };
}

export async function getCharacterByName(name: string) {
  try {
    const normalizedName = name.trim();

    const characterData = await getCachedCharacterData(normalizedName);

    if (!characterData) {
      return null;
    }

    return characterData;
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, `Failed to fetch character: ${name}`);
  }
}
