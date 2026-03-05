"use server";

import { assertZodParse, NonEmptyString } from "@repo/validation";
import { getCharacterByName } from "../server";

export async function searchCharacterByName(payload: unknown) {
  const name = assertZodParse(NonEmptyString, payload);

  const data = await getCharacterByName(name);

  if (!data) {
    return { success: false, error: "Character not found" };
  }

  return { success: true, data };
}
