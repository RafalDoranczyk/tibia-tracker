"use server";

import { getUserScopedQuery } from "@/core/supabase";
import { CharacterIDSchema } from "@/modules/characters";
import { assertZodParse } from "@/utils";

import {
  CharacterCharmRowSchema,
  type CharacterCharmRowWithCharm,
  FetchCharacterCharmsResponseSchema,
} from "../schemas";

const characterCharmKeys = CharacterCharmRowSchema.keyof().options.join(",");

const SELECT = `
  ${characterCharmKeys},
  charm:charms(*)
`;

export async function fetchCharacterCharms(
  characterId: unknown
): Promise<CharacterCharmRowWithCharm[]> {
  const parsedCharacterId = assertZodParse(CharacterIDSchema, characterId);

  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("character_charms")
    .select(SELECT)
    .eq("character_id", parsedCharacterId)
    .order("unlocked_at", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch character charms");
  }

  return assertZodParse(FetchCharacterCharmsResponseSchema, data);
}
