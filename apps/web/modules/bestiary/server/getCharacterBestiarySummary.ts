import { getUserScopedQuery } from "@/core/supabase";

import { BestiaryCacheTags } from "../cacheTags";
import { CharacterBestiarySummarySchema } from "../schemas";

export async function getCharacterBestiarySummary(characterId: string) {
  const { supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("character_bestiary_summary")
    .select("character_id, unlocked_charm_points, total_charm_points, completed_soulpits")
    .eq("character_id", characterId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const parsed = data
    ? CharacterBestiarySummarySchema.parse(data)
    : CharacterBestiarySummarySchema.parse({
        character_id: characterId,
        unlocked_charm_points: 0,
        total_charm_points: 0,
        completed_soulpits: 0,
      });

  return {
    data: parsed,
    cacheTag: BestiaryCacheTags.summary(characterId),
  };
}
