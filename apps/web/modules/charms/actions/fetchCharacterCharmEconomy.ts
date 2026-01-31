"use server";

import { getUserScopedQuery } from "@/core/supabase";
import { CharacterIDSchema } from "@/modules/characters";
import { assertZodParse } from "@/utils";

import { type CharmEconomy, CharmEconomySchema } from "../schemas";

export async function fetchCharacterCharmEconomy(characterId: unknown): Promise<CharmEconomy> {
  const parsedCharacterId = assertZodParse(CharacterIDSchema, characterId);

  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("character_charm_economy")
    .select("*")
    .eq("character_id", parsedCharacterId)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to fetch character charm economy");
  }

  return assertZodParse(CharmEconomySchema, data);
}
