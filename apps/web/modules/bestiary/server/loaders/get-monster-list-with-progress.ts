import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import {
  FetchCharacterBestiaryPayloadSchema,
  type MonsterWithCharacterProgress,
  MonsterWithCharacterProgressSchema,
} from "../../schemas";
import { dbGetMonsterListWithProgress } from "../queries/monsters-with-character-progress";

type FetchCharacterBestiaryResult = {
  monstersWithProgress: MonsterWithCharacterProgress[];
  totalCount: number;
  totalPages: number;
};

export async function getMonsterListWithProgress(
  payload: unknown
): Promise<FetchCharacterBestiaryResult> {
  const { characterId, filters } = assertZodParse(FetchCharacterBestiaryPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const safePage = Math.max(filters.page, 1);
  const safeLimit = Math.min(Math.max(filters.limit, 1), 100);

  const { data, error } = await dbGetMonsterListWithProgress(supabase, {
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
  // The total count is returned as a separate field in the first item of the data array
  const totalCount = monstersWithProgress[0]?.total_count ?? 0;

  return {
    monstersWithProgress,
    totalCount,
    totalPages: Math.ceil(totalCount / filters.limit),
  };
}
