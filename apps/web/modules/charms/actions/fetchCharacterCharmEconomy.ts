"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { CharmEconomySchema } from "../schemas";
import type { CharmEconomy } from "../types";

export async function fetchCharacterCharmEconomy(characterId: string): Promise<CharmEconomy> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("character_charm_economy")
    .select("*")
    .eq("character_id", characterId)
    .single();

  if (error) {
    throw new Error("Failed to fetch character charm economy");
  }

  return assertZodParse(CharmEconomySchema, data);
}
