"use server";

import { revalidatePath } from "next/cache";

import { getUserScopedQuery } from "@/core/supabase";
import { PATHS } from "@/paths";
import { assertZodParse } from "@/utils";

import { type Character, CharacterSchema, CreateCharacterSchema } from "../schemas";

export async function createCharacter(payload: unknown): Promise<Character> {
  const parsed = assertZodParse(CreateCharacterSchema, payload);

  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("characters")
    .insert([{ ...parsed }])
    .select()
    .single();

  if (error) {
    throw new Error("Failed to create character");
  }

  assertZodParse(CharacterSchema, data);
  revalidatePath(PATHS.CHARACTERS);

  return data;
}
