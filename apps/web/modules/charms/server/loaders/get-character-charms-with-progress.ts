import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";

import { mapCharmToAppCharm } from "../../mappers/mapCharmToAppCharm";
import { mapCharmWithProgress } from "../../mappers/mapCharmWithProgress";
import { type CharacterCharmWithProgress, CharacterCharmWithProgressSchema } from "../../schemas";
import { getCharacterCharmList } from "./get-character-charm-list";
import { getCharmList } from "./get-charm-list";

export async function getCharacterCharmsWithProgress(
  payload: unknown
): Promise<CharacterCharmWithProgress[]> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  const [charms, characterCharms] = await Promise.all([
    getCharmList(),
    getCharacterCharmList(characterId),
  ]);

  // 1. Domain → UI view model
  const charmViewModels = charms.map(mapCharmToAppCharm);

  // 2. UI view model + progress → final UI model
  const charmsWithProgress = mapCharmWithProgress(charmViewModels, characterCharms);

  return assertZodParse(CharacterCharmWithProgressSchema.array(), charmsWithProgress);
}
