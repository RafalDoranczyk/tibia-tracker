import {
  CharacterBestiaryRepo,
  MonsterWithCharacterProgressSchema,
} from "@repo/database/character-bestiary";
import { AppErrorCode, throwAndLogError } from "@repo/errors";
import { assertZodParse } from "@repo/validation";
import { requireAuthenticatedSupabase } from "@/core/supabase/guard";
import { FetchCharacterBestiaryPayloadSchema, type FetchCharacterBestiaryResult } from "../schemas";

export async function getMonsterListWithProgress(
  payload: unknown
): Promise<FetchCharacterBestiaryResult> {
  const { characterId, filters } = assertZodParse(FetchCharacterBestiaryPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const safePage = Math.max(filters.page, 1);
  const safeLimit = Math.min(Math.max(filters.limit, 1), 100);

  const { data, error } = await CharacterBestiaryRepo.getListWithProgress(supabase, {
    characterId,
    filters: {
      ...filters,
      page: safePage,
      limit: safeLimit,
    },
  });

  if (error) {
    throwAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch character bestiary monsters with progress"
    );
  }

  const monstersWithProgress = assertZodParse(
    MonsterWithCharacterProgressSchema.array(),
    data ?? []
  );

  const totalCount = monstersWithProgress[0]?.total_count ?? 0;

  return {
    monstersWithProgress,
    totalCount,
    totalPages: Math.ceil(totalCount / filters.limit),
  };
}
