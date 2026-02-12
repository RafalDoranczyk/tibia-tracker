import type { CharacterVocation } from "../schemas";

export const CHARACTER_VOCATION_LABELS: Record<CharacterVocation, string> = {
  knight: "Knight",
  paladin: "Paladin",
  sorcerer: "Sorcerer",
  druid: "Druid",
  monk: "Monk",
};

export const MAX_CHARACTERS_PER_USER = 3;
