import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbGetBestiarySummary(supabase: TypedSupabaseClient, characterId: string) {
  console.log("db");
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
