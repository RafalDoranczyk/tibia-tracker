"use server";

import { assertZodParse } from "@/lib/zod";
import { CharacterNameSchema } from "../schemas";
import { getCharacterByName } from "../server";

export async function searchCharacter(payload: unknown) {
  const name = assertZodParse(CharacterNameSchema, payload);

  const data = await getCharacterByName(name);

  if (!data) {
    return { success: false, error: "Character not found" };
  }

  return { success: true, data };
}
