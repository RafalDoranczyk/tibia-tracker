import type { HuntSpotAnalytics } from "./schemas";

export type ActiveBoost = "stamina" | "boost" | "double";

export type HuntSpotsAnalyticsUI = {
  bestXpSpot: HuntSpotAnalytics;
  bestProfitSpot: HuntSpotAnalytics;
  remainingSpots: HuntSpotAnalytics[];
};
