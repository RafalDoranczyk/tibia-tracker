"use client";

import { updateLastActiveCharacter } from "../actions";

export function usePersistActiveCharacter() {
  return (characterId: string) => updateLastActiveCharacter(characterId);
}
