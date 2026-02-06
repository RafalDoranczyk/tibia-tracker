"use server";

import { revalidatePath } from "next/cache";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { PATHS } from "@/paths";
import { assertZodParse } from "@/utils";

import { type Character, UpdateCharacterSchema } from "../schemas";

export async function updateCharacter(payload: unknown): Promise<Character> {
  const parsed = assertZodParse(UpdateCharacterSchema, payload);

  const { id, ...data } = parsed;

  const { supabase } = await requireAuthenticatedSupabase();

  const { data: updated, error } = await supabase
    .from("characters")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update character");
  }

  revalidatePath(PATHS.CHARACTERS);

  return assertZodParse(UpdateCharacterSchema, updated);
}
