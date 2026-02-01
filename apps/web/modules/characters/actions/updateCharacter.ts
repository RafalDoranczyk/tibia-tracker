"use server";

import { revalidatePath } from "next/cache";

import { getUserScopedQuery } from "@/core/supabase";
import { PATHS } from "@/paths";
import { assertZodParse } from "@/utils";

import { type Character, UpdateCharacterSchema } from "../schemas";

export async function updateCharacter(payload: unknown): Promise<Character> {
  const parsed = assertZodParse(UpdateCharacterSchema, payload);

  const { id, ...data } = parsed;

  const { supabase } = await getUserScopedQuery();

  const { data: updated, error } = await supabase
    .from("characters")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Failed to update character");
  }

  assertZodParse(UpdateCharacterSchema, updated);
  revalidatePath(PATHS.CHARACTERS);

  return updated;
}
