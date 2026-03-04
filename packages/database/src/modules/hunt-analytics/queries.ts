import type { TypedSupabaseClient } from "../../types";

const HUNT_SPOT_RECENT_LIMIT = 8;

type dbGetHuntSpotsAnalyticsPayload = {
  supabase: TypedSupabaseClient;
  characterId: string;
  recentLimit?: number;
};
export function dbGetHuntSpotsAnalyticsRPC({
  supabase,
  characterId,
  recentLimit = HUNT_SPOT_RECENT_LIMIT,
}: dbGetHuntSpotsAnalyticsPayload) {
  return supabase.rpc("get_hunt_place_analytics", {
    p_character_id: characterId,
    p_recent_limit: recentLimit,
  });
}
