import { updateTag } from "next/cache";
import { CharmCache } from "../cache/charms-cache";

export function updateCharacterCharmTags(characterId: string) {
  updateTag(CharmCache.characterList(characterId));
  updateTag(CharmCache.characterEconomy(characterId));
}
