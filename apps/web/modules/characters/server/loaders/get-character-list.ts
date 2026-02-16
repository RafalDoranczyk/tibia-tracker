import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createAdminClient } from "@/core/supabase/clients/admin";
import { assertZodParse } from "@/lib/zod";
import { CharactersCache } from "../../cache/characters-cache";
import { type Character, CharacterSchema } from "../../schemas";
import { dbGetCharacters } from "../queries/characters";

async function getCachedCharacterList(userId: string) {
  "use cache";
  cacheLife("days");
  cacheTag(CharactersCache.characterList(userId));

  const supabase = createAdminClient();

  const { data, error } = await dbGetCharacters(supabase, userId);

  if (error) throw error;
  return data;
}

export async function getCharacterList(): Promise<Character[]> {
  const { user } = await requireAuthenticatedSupabase();

  try {
    const data = await getCachedCharacterList(user.id);
    return assertZodParse(CharacterSchema.array(), data);
  } catch (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch characters");
  }
}
