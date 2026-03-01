import type { TypedSupabaseClient } from "@/core/supabase/types";

const HUNT_SPOT_RECENT_LIMIT = 10;

export function dbGetHuntSpotsAnalytics(supabase: TypedSupabaseClient, p_character_id: string) {
  return supabase.rpc("get_hunt_place_analytics", {
    p_character_id,
    p_recent_limit: HUNT_SPOT_RECENT_LIMIT,
  });
}
