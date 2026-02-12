"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";

import { type CharacterCharmEconomy, CharacterCharmEconomySchema } from "../schemas";
import { getCharacterCharmEconomy } from "../server";

export async function fetchCharacterCharmEconomy(payload: unknown): Promise<CharacterCharmEconomy> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getCharacterCharmEconomy(supabase, characterId);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch character charm economy");
  }

  return assertZodParse(CharacterCharmEconomySchema, data);
}
