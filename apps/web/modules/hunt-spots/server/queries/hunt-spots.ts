import type { TypedSupabaseClient } from "@/core/supabase/types";

export const HUNT_SPOT_RECENT_LIMIT = 5;

export function dbGetHuntSpots(supabase: TypedSupabaseClient, p_character_id: string) {
  return supabase.rpc("get_hunt_place_analytics", {
    p_character_id,
    p_recent_limit: HUNT_SPOT_RECENT_LIMIT,
  });
}
