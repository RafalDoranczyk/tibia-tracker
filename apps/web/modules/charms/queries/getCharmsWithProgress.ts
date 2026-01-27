"use server";

import { fetchCharacterCharms } from "../actions/fetchCharacterCharms";
import { fetchCharms } from "../actions/fetchCharms";
import { mapCharmsWithProgress } from "../mappers/mapCharmsWithProgress";
import type { CharmWithProgress } from "../types";

export async function getCharmsWithProgress(characterId: string): Promise<CharmWithProgress[]> {
  const [charms, characterCharms] = await Promise.all([
    fetchCharms(),
    fetchCharacterCharms(characterId),
  ]);

  return mapCharmsWithProgress(charms, characterCharms);
}
