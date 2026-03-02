import { cacheLife, cacheTag } from "next/cache";
import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createAdminClient } from "@/core/supabase/clients/admin";
import { assertZodParse } from "@/lib/zod";
import type { Character } from "@/modules/characters";
import { dbGetCharacterById } from "@/modules/characters/server/queries/get-character-by-id";
import { CharacterCache } from "../../cache/character";
import { FetchCharacterExpHistorySchema } from "../../schemas/db/character-exp-history.schema";
import { dbGetCharacterLast30DaysExp } from "../queries/get-character-exp-history";

async function getCachedCharacterLast30DaysExp(character: Character) {
  "use cache";
  cacheLife("days");
  cacheTag(CharacterCache.expHistory(character.id));

  const supabase = createAdminClient();

  const { data, error } = await dbGetCharacterLast30DaysExp(supabase, character.name);

  if (error) throw error;
  return data;
}

export async function getCharacterLast30DaysExp(characterId: string) {
  const { supabase } = await requireAuthenticatedSupabase();

  try {
    const { data: character, error: charError } = await dbGetCharacterById(supabase, characterId);

    if (character === null) {
      throwAndLogError(
        charError,
        AppErrorCode.SERVER_ERROR,
        `Character with ID ${characterId} not found`
      );
    }

    const data = await getCachedCharacterLast30DaysExp(character);

    return assertZodParse(FetchCharacterExpHistorySchema.array(), data);
  } catch (error) {
    throwAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch character monthly experience history"
    );
  }
}
