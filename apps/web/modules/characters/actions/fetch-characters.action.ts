"use server";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { type Character, CharacterSchema } from "../schemas";
import { getCharacters } from "../server";

export async function fetchCharacters(): Promise<Character[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await getCharacters(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch characters");
  }

  return assertZodParse(CharacterSchema.array(), data);
}
