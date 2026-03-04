import type { HuntSpotAnalytics } from "@repo/database";
import type { HuntSpotsAnalyticsUI } from "../types";

export function mapHuntSpotsToUI(data: HuntSpotAnalytics[]): HuntSpotsAnalyticsUI {
  const bestXpSpot = [...data].sort((a, b) => b.avg_raw_xp_h - a.avg_raw_xp_h)[0];
  const bestProfitSpot = [...data].sort((a, b) => b.avg_profit_h - a.avg_profit_h)[0];

  const leaderIds = new Set([bestXpSpot.place_id, bestProfitSpot.place_id]);

  const remainingSpots = data.filter((item) => !leaderIds.has(item.place_id));

  return {
    bestXpSpot,
    bestProfitSpot,
    remainingSpots,
  };
}
