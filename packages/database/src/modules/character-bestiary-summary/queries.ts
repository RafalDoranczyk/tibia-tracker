import type { TypedSupabaseClient } from "../../types";

type DbGetBestiarySummaryPayload = {
  supabase: TypedSupabaseClient;
  characterId: string;
};

export function dbGetBestiarySummary({ supabase, characterId }: DbGetBestiarySummaryPayload) {
  return supabase
    .from("character_bestiary_summary")
    .select(`
      character_id,
      unlocked_charm_points,
      total_charm_points,
      completed_soulpits
      `)
    .eq("character_id", characterId)
    .maybeSingle();
}
