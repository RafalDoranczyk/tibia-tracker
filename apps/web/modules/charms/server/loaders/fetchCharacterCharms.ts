import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";

import { type CharacterCharmDetailed, CharacterCharmDetailedSchema } from "../../schemas";
import { getCharacterCharms } from "../queries/get-character-charms.query";

export async function fetchCharacterCharms(payload: unknown): Promise<CharacterCharmDetailed[]> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getCharacterCharms(supabase, characterId);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch character charms");
  }

  return assertZodParse(CharacterCharmDetailedSchema.array(), data);
}
