"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { BestiaryFiltersSchema } from "../schemas";
import { monstersWithProgressQuery } from "../server/queries/monstersWithProgress.query";

export async function fetchCharacterBestiary({
  characterId,
  filters,
}: {
  characterId: string;
  filters: unknown;
}) {
  const parsedFilters = assertZodParse(BestiaryFiltersSchema, filters);

  const { supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await monstersWithProgressQuery(supabase, characterId, parsedFilters);

  if (error) {
    throw wrapAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch character bestiary monsters with progress"
    );
  }

  const totalCount = data?.[0]?.total_count ?? 0;

  return {
    monstersWithProgress: data ?? [],
    totalCount,
    totalPages: Math.ceil(totalCount / parsedFilters.limit),
  };
}
