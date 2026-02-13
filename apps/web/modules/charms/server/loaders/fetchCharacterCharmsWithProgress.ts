import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";

import { mapCharmToAppCharm } from "../../mappers/mapCharmToAppCharm";
import { mapCharmWithProgress } from "../../mappers/mapCharmWithProgress";
import { type CharacterCharmWithProgress, CharacterCharmWithProgressSchema } from "../../schemas";
import { fetchCharacterCharms } from "./fetchCharacterCharms";
import { fetchCharms } from "./fetchCharms";

export async function fetchCharacterCharmsWithProgress(
  payload: unknown
): Promise<CharacterCharmWithProgress[]> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  const [charms, characterCharms] = await Promise.all([
    fetchCharms(),
    fetchCharacterCharms(characterId),
  ]);

  // 1. Domain → UI view model
  const charmViewModels = charms.map(mapCharmToAppCharm);

  // 2. UI view model + progress → final UI model
  const charmsWithProgress = mapCharmWithProgress(charmViewModels, characterCharms);

  return assertZodParse(CharacterCharmWithProgressSchema.array(), charmsWithProgress);
}
