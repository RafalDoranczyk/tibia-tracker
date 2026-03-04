import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { cacheLife, cacheTag } from "next/cache";
import { tibiaData } from "@/core/tibia-data";
import { CharactersCache } from "../cache";

async function getCachedCharacterData(name: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(CharactersCache.byName(name));

  const response = await tibiaData.getCharacter(name);

  return response?.character ?? null;
}

export async function getCharacterByName(name: string) {
  try {
    const characterData = await getCachedCharacterData(name);

    return characterData;
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, `Failed to fetch character: ${name}`);
  }
}
