import { getNeededExpForLevel } from "@repo/tibia-utils";
import type { ChartEntry, HistoryChartUI } from "../types";

/**
 * Calculates chart points and growth statistics
 */
function calculateChartPoints(data: ChartEntry[]) {
  // Reverse the data to calculate growth chronologically (from oldest to newest)
  const chronological = [...data].reverse();

  let totalGained = 0;
  let bestDay = 0;

  const points = chronological.map((entry, index) => {
    const prevEntry = chronological[index - 1];
    const dailyGain = prevEntry ? entry.experience - prevEntry.experience : 0;

    totalGained += dailyGain;
    if (dailyGain > bestDay) bestDay = dailyGain;

    return {
      date: new Date(entry.recorded_at),
      dailyGain,
      level: entry.level,
    };
  });

  return { points, totalGained, bestDay };
}

/**
 * Main Mapper
 */
export function mapExpHistoryToChartData(data: ChartEntry[]): HistoryChartUI {
  if (!data || data.length === 0) {
    return createEmptySummary();
  }

  // Assuming DESC from the database
  const newestEntry = data[0];
  const { points, totalGained, bestDay } = calculateChartPoints(data);

  const averageGain = data.length > 1 ? Math.floor(totalGained / (data.length - 1)) : 0;
  const expForNextLevel = getNeededExpForLevel(newestEntry.level + 1);

  return {
    chartPoints: points,
    summary: {
      totalGained,
      bestDay,
      averageGain,
      lastLevel: newestEntry.level,
      currentExp: newestEntry.experience,
      expMissing: Math.max(0, expForNextLevel - newestEntry.experience),
    },
  };
}

function createEmptySummary(): HistoryChartUI {
  return {
    chartPoints: [],
    summary: {
      expMissing: 0,
      totalGained: 0,
      bestDay: 0,
      averageGain: 0,
      lastLevel: 0,
      currentExp: 0,
    },
  };
}
