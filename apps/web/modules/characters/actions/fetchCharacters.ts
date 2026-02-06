"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { type Character, CharacterSchema } from "../schemas";

const SELECT = CharacterSchema.keyof().options.join(", ");

export async function fetchCharacters(): Promise<Character[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase.from("characters").select(SELECT);

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch characters");
  }

  return assertZodParse(CharacterSchema.array(), data);
}
