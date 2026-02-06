"use client";

import { updateLastActiveCharacter } from "../actions/updateUserSettings";

export function usePersistActiveCharacter() {
  return (characterId: string) => updateLastActiveCharacter(characterId);
}
