"use client";

import { updateLastActiveCharacter } from "../actions/update-last-active-character.action";

export function usePersistActiveCharacter() {
  return (characterId: string) => updateLastActiveCharacter(characterId);
}
