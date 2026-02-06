"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { CharacterIDSchema } from "@/modules/characters";
import { assertZodParse } from "@/utils";

import {
  CharacterCharmSchema,
  CharmSchema,
  type FetchCharacterCharmsResponse,
  FetchCharacterCharmsResponseSchema,
} from "../schemas";

const characterCharmKeys = CharacterCharmSchema.keyof().options.join(",");
const charmKeys = CharmSchema.keyof().options.join(", ");

const SELECT = `
  ${characterCharmKeys},
  charm:charms(${charmKeys})
`;

export async function fetchCharacterCharms(
  characterId: unknown
): Promise<FetchCharacterCharmsResponse> {
  const parsedCharacterId = assertZodParse(CharacterIDSchema, characterId);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("character_charms")
    .select(SELECT)
    .eq("character_id", parsedCharacterId);

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch character charms");
  }

  return assertZodParse(FetchCharacterCharmsResponseSchema, data);
}
