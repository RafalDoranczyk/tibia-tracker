import type { BestiaryDifficulty } from "@/modules/monsters";
import type { BestiaryStage } from "../db/character-bestiary.schema";
import type { BestiaryStageFilter } from "../input/bestiary-filters.schema";

export const BESTIARY_DIFFICULTY_LABELS: Record<BestiaryDifficulty, string> = {
  1: "Trivial",
  2: "Easy",
  3: "Medium",
  4: "Hard",
  5: "Challenging",
};

// --- FILTERS ---

/**
 * UI Type: includes 'all' which technically means "undefined" (no filter) sent to API
 */
export type BestiaryStageFilterOption = BestiaryStageFilter | "all";

export const BESTIARY_STAGE_FILTER_LABELS: Record<BestiaryStageFilterOption, string> = {
  all: "All",
  not_completed: "Not Completed",
  completed: "Completed",
};

export const BESTIARY_STAGE_FILTER_VALUES: BestiaryStageFilterOption[] = [
  "all",
  "not_completed",
  "completed",
];

// --- STAGES ---

/**
 * Named bestiary stages
 * Using 'as const' makes it strictly typed literals
 */
export const BESTIARY_STAGE = {
  STARTED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
} as const;

// Helper type guard if needed later
export const isBestiaryStage = (val: number): val is BestiaryStage => [1, 2, 3].includes(val);
