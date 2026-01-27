"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { CharacterCharmRowSchema, FetchCharacterCharmsResponseSchema } from "../schemas";
import type { CharacterCharmRowWithCharm } from "../types";

const characterCharmKeys = CharacterCharmRowSchema.keyof().options.join(",");

const CHARM_SELECT = `
  ${characterCharmKeys},
  charm:charms(*)
`;

export async function fetchCharacterCharms(
  characterId: string
): Promise<CharacterCharmRowWithCharm[]> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("character_charms")
    .select(CHARM_SELECT)
    .eq("character_id", characterId)
    .order("unlocked_at", { ascending: true });

  if (error) {
    console.log(error);
    throw new Error("Failed to fetch character charms");
  }

  return assertZodParse(FetchCharacterCharmsResponseSchema, data);
}
