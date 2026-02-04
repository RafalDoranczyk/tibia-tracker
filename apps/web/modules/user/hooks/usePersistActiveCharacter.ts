"use client";

import { AppError, AppErrorCodes } from "@/core/errors";

import { updateLastActiveCharacter } from "../actions/updateUserSettings";

export function usePersistActiveCharacter() {
  return async (characterId: string) => {
    try {
      await updateLastActiveCharacter(characterId);
    } catch {
      throw new AppError(AppErrorCodes.SERVER_ERROR, "Failed to persist active character");
    }
  };
}
