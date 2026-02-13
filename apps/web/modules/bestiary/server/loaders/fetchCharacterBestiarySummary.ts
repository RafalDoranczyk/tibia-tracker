import { unstable_cache } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { createStaticSupabaseClient } from "@/core/supabase/clients/static";
import { assertZodParse } from "@/lib/zod";

import { BestiaryCacheTags } from "../../cache/bestiary.tags"; // Importujemy Twoje tagi!
import { type CharacterBestiarySummary, CharacterBestiarySummarySchema } from "../../schemas";
import { getBestiarySummary } from "../queries/get-bestiary-summary.query";

const getCachedBestiarySummary = (characterId: string) =>
  unstable_cache(
    async () => {
      const supabase = createStaticSupabaseClient();

      const { data, error } = await getBestiarySummary(supabase, characterId);

      if (error) {
        throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch summary");
      }

      return data;
    },
    ["bestiary-summary", characterId],
    {
      revalidate: 86400,
      tags: [BestiaryCacheTags.summary(characterId)],
    }
  )();

export async function fetchCharacterBestiarySummary(
  character_id: string
): Promise<CharacterBestiarySummary> {
  // Autoryzację zostawiamy na zewnątrz cache'u!
  // Chcemy, żeby system zawsze sprawdzał uprawnienia przed wydaniem danych z pamięci.
  await requireAuthenticatedSupabase();

  const data = await getCachedBestiarySummary(character_id);

  const safeData = data ?? {
    character_id,
    unlocked_charm_points: 0,
    total_charm_points: 0,
    completed_soulpits: 0,
  };

  return assertZodParse(CharacterBestiarySummarySchema, safeData);
}
