"use server";

import { revalidatePath } from "next/cache";

import { PATHS } from "@/constants";
import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { updateCharacterSchema } from "../schemas";
import type { Character, UpdateCharacterPayload } from "../types";

export async function updateCharacter(payload: UpdateCharacterPayload): Promise<Character> {
  const parsed = assertZodParse(updateCharacterSchema, payload);
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

  assertZodParse(updateCharacterSchema, updated);
  revalidatePath(PATHS.CHARACTERS);
  return updated;
}
