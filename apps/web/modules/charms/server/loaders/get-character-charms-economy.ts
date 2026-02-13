import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";

import { type CharacterCharmEconomy, CharacterCharmEconomySchema } from "../../schemas";
import { dbGetCharacterCharmEconomy } from "../queries/character-charm-economy";

export async function getCharacterCharmsEconomy(payload: unknown): Promise<CharacterCharmEconomy> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetCharacterCharmEconomy(supabase, characterId);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch character charm economy");
  }

  return assertZodParse(CharacterCharmEconomySchema, data);
}
