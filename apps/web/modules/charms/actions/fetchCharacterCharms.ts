"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { type FetchCharacterCharmsResponse, FetchCharacterCharmsResponseSchema } from "../schemas";

export async function fetchCharacterCharms(
  characterId: string
): Promise<FetchCharacterCharmsResponse> {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("character_charms")
    .select(
      `
      id,
      character_id,
      charm_id,
      level,
      unlocked_at,
      charm:charms(*)
    `
    )
    .eq("character_id", characterId);

  if (error) throw error;

  return assertZodParse(FetchCharacterCharmsResponseSchema, data);
}
