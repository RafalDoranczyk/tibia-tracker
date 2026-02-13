import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";

import { type CharacterCharmDetailed, CharacterCharmDetailedSchema } from "../../schemas";
import { dbGetCharacterCharms } from "../queries/character-charms";

export async function getCharacterCharmList(payload: unknown): Promise<CharacterCharmDetailed[]> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetCharacterCharms(supabase, characterId);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch character charms");
  }

  return assertZodParse(CharacterCharmDetailedSchema.array(), data);
}
