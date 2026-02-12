"use server";

import { revalidatePath } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { PATHS } from "@/core/paths";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/lib/zod";

import { type Character, CharacterSchema, UpdateCharacterSchema } from "../schemas";
import { updateCharacter as mutation } from "../server";

export async function updateCharacter(payload: unknown): Promise<Character> {
  const { id, ...data } = assertZodParse(UpdateCharacterSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data: updated, error } = await mutation(supabase, id, data);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update character");
  }

  revalidatePath(PATHS.CHARACTERS);

  return assertZodParse(CharacterSchema, updated);
}
