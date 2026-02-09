"use server";

import { fetchCharacterCharms } from "../../actions/fetchCharacterCharms";
import { fetchCharms } from "../../actions/fetchCharms";
import { mapCharmToAppCharm } from "../../mappers/mapCharmToAppCharm";
import { mapCharmWithProgress } from "../../mappers/mapCharmWithProgress";
import type { CharacterCharmWithProgress } from "../../schemas";

export async function getCharmsWithProgress(
  characterId: string
): Promise<CharacterCharmWithProgress[]> {
  const [charms, characterCharms] = await Promise.all([
    fetchCharms(),
    fetchCharacterCharms(characterId),
  ]);

  const appCharms = charms.map(mapCharmToAppCharm);
  const appCharmsWithProgress = mapCharmWithProgress(appCharms, characterCharms);

  return appCharmsWithProgress;
}
