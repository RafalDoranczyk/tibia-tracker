import type { TypedSupabaseClient } from "../../types";

const HUNT_SPOT_RECENT_LIMIT = 8;

// --- Repository Implementation ---
export const HuntAnalyticsRepo = {
  /**
   * Fetches analytics data for hunt spots using an RPC call.
   */
  getAnalytics: (
    supabase: TypedSupabaseClient,
    { characterId, recentLimit = HUNT_SPOT_RECENT_LIMIT }: DbGetHuntSpotsAnalyticsPayload
  ) => {
    return supabase.rpc("get_hunt_place_analytics", {
      p_character_id: characterId,
      p_recent_limit: recentLimit,
    });
  },
};

type DbGetHuntSpotsAnalyticsPayload = {
  characterId: string;
  recentLimit?: number;
};
