import type { HuntSpot } from "../schemas";

export function getPeakPerformance(data: HuntSpot[]) {
  const bestXp = [...data].sort((a, b) => b.avg_raw_xp_h - a.avg_raw_xp_h)[0];
  const bestProfit = [...data].sort((a, b) => b.avg_profit_h - a.avg_profit_h)[0];

  const leaderIds = new Set([bestXp.place_id, bestProfit.place_id]);

  const filteredData = data.filter((item) => !leaderIds.has(item.place_id));

  return {
    bestXp,
    bestProfit,
    remainingData: filteredData,
  };
}
