import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { type Character, CharacterSchema } from "../../schemas";
import { dbGetCharacters } from "../queries/characters";

export async function getCharacterList(): Promise<Character[]> {
  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await dbGetCharacters(supabase);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch characters");
  }

  return assertZodParse(CharacterSchema.array(), data);
}
