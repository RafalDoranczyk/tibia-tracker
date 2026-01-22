"use server";

import { revalidatePath } from "next/cache";

import { PATHS } from "@/constants";
import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { CharacterSchema, CreateCharacterSchema } from "../schemas";
import type { Character, CreateCharacterPayload } from "../types";

export async function createCharacter(payload: CreateCharacterPayload): Promise<Character> {
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
