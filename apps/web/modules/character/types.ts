import type { CharacterExpHistory } from "@repo/database";

export type ChartEntry = Omit<CharacterExpHistory, "created_at" | "source" | "vocation" | "world">;

type ChartPoint = {
  date: Date;
  dailyGain: number;
  level: number;
};

type ChartSummary = {
  totalGained: number;
  bestDay: number;
  averageGain: number;
  expMissing: number;
  lastLevel: number;
  currentExp: number;
};

export type HistoryChartUI = {
  chartPoints: ChartPoint[];
  summary: ChartSummary;
};
