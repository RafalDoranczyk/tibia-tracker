"use server";

import { updateTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { CharactersCache } from "../cache/characters-cache";
import { type Character, CharacterSchema, CreateCharacterSchema } from "../schemas";
import { dbInsertCharacter } from "../server";

export async function createCharacter(payload: unknown): Promise<Character> {
  const parsed = assertZodParse(CreateCharacterSchema, payload);

  const { supabase, user } = await requireAuthenticatedSupabase();

  const { data, error } = await dbInsertCharacter(supabase, user.id, parsed);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to create character");
  }

  updateTag(CharactersCache.characterList(user.id));

  return assertZodParse(CharacterSchema, data);
}
