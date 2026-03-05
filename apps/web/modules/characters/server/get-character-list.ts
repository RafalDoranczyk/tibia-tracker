import { type Character, CharacterSchema, CharactersRepo } from "@repo/database/characters";
import { createAdminSupabaseClient } from "@repo/database/client";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { cacheLife, cacheTag } from "next/cache";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { CharactersCache } from "../cache";

async function getCachedCharacterList(userId: string) {
  "use cache";
  cacheLife("days");
  cacheTag(CharactersCache.characterList(userId));

  const supabase = createAdminSupabaseClient();

  const { data, error } = await CharactersRepo.getList(supabase, userId);

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
