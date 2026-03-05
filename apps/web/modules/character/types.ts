import type { CharacterExpHistory } from "@repo/database/experience-log";

export type ChartEntry = CharacterExpHistory;

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
