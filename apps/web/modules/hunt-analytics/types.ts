import type { HuntSpotAnalytics } from "@repo/database/hunt-analytics";

export type ActiveBoost = "stamina" | "boost" | "double" | "cake";

export type HuntSpotsAnalyticsUI = {
  bestXpSpot: HuntSpotAnalytics;
  bestProfitSpot: HuntSpotAnalytics;
  remainingSpots: HuntSpotAnalytics[];
};
