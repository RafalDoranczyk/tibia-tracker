import type { MonsterWithCharacterProgress } from "./schemas";

export type CharacterBestiaryFullResponse = {
  monsters: MonsterWithCharacterProgress[];
  totalCount: number;
  totalPages: number;
};
