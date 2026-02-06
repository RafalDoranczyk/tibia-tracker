"use server";

import { revalidatePath } from "next/cache";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { PATHS } from "@/paths";
import { assertZodParse } from "@/utils";

import { type Character, CharacterSchema, CreateCharacterSchema } from "../schemas";

export async function createCharacter(payload: unknown): Promise<Character> {
  const parsed = assertZodParse(CreateCharacterSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("characters")
    .insert([{ ...parsed }])
    .select()
    .single();

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to create character");
  }

  revalidatePath(PATHS.CHARACTERS);

  return assertZodParse(CharacterSchema, data);
}
