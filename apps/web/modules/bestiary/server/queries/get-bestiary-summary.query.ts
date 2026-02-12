import type { TypedSupabaseClient } from "@/core/supabase";

export function getBestiarySummary(supabase: TypedSupabaseClient, characterId: string) {
  return supabase
    .from("character_bestiary_summary")
    .select(`
      character_id,
      unlocked_charm_points,
      total_charm_points,
      completed_soulpits`)
    .eq("character_id", characterId)
    .maybeSingle();
}
