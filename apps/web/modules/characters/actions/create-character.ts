"use server";

import { revalidatePath } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { PATHS } from "@/core/paths";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { type Character, CharacterSchema, CreateCharacterSchema } from "../schemas";
import { dbInsertCharacter } from "../server";

export async function createCharacter(payload: unknown): Promise<Character> {
  const parsed = assertZodParse(CreateCharacterSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbInsertCharacter(supabase, parsed);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to create character");
  }

  revalidatePath(PATHS.CHARACTERS);

  return assertZodParse(CharacterSchema, data);
}
