import { unstable_cache } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createAdminClient } from "@/core/supabase/clients/admin";
import { assertZodParse } from "@/lib/zod";

import { BestiaryCache } from "../../cache/bestiary-cache";
import { type CharacterBestiarySummary, CharacterBestiarySummarySchema } from "../../schemas";
import { dbGetBestiarySummary } from "../queries/character_bestiary_summary";

export async function getCharacterBestiarySummary(
  character_id: string
): Promise<CharacterBestiarySummary> {
  await requireAuthenticatedSupabase();

  try {
    const getCachedData = unstable_cache(
      async () => {
        const supabase = createAdminClient();
        const { data, error } = await dbGetBestiarySummary(supabase, character_id);

        if (error) throw error;
        return data;
      },
      [BestiaryCache.keys.summary, character_id],
      {
        tags: [BestiaryCache.tags.summary(character_id)],
        revalidate: 86400, // 24h
      }
    );

    const data = await getCachedData();

    const safeData = data ?? {
      character_id,
      unlocked_charm_points: 0,
      total_charm_points: 0,
      completed_soulpits: 0,
    };

    return assertZodParse(CharacterBestiarySummarySchema, safeData);
  } catch (error) {
    throwAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch character bestiary monsters with progress"
    );
  }
}
