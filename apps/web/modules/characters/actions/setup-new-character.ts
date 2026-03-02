"use server";

import { insertCharacterExpHistory } from "@/modules/character/actions";
import { createCharacter } from "./create-character";

export async function setupNewCharacter(payload: unknown) {
  const character = await createCharacter(payload);

  let expSynced = false;

  try {
    await insertCharacterExpHistory(character);
    expSynced = true;
  } catch (error) {
    console.error(`[Setup] Failed to sync EXP for ${character.name}:`, error);
  }

  return {
    character,
    status: {
      exp: expSynced,
      isFullySynced: expSynced,
    },
  };
}
