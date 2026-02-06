"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { CharacterIDSchema } from "@/modules/characters";
import { assertZodParse } from "@/utils";

import { type CharacterCharmEconomy, CharacterCharmEconomySchema } from "../schemas";

const SELECT = Object.keys(CharacterCharmEconomySchema.shape).join(", ");

export async function fetchCharacterCharmEconomy(
  characterId: unknown
): Promise<CharacterCharmEconomy> {
  const parsedCharacterId = assertZodParse(CharacterIDSchema, characterId);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("character_charm_economy")
    .select(SELECT)
    .eq("character_id", parsedCharacterId)
    .maybeSingle();

  if (error) {
    throw wrapAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch character charm economy"
    );
  }

  return assertZodParse(CharacterCharmEconomySchema, data);
}
