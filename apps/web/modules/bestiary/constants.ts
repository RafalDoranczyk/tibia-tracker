import type { BestiaryDifficulty, BestiaryStage, BestiaryStageFilter } from "./schemas";

export const BESTIARY_CLASSES = [
  "Amphibic",
  "Aquatic",
  "Bird",
  "Construct",
  "Demon",
  "Dragon",
  "Elemental",
  "Extra Dimensional",
  "Fey",
  "Giant",
  "Human",
  "Humanoid",
  "Inkborn",
  "Lycanthrope",
  "Magical",
  "Mammal",
  "Plant",
  "Reptile",
  "Slime",
  "Undead",
  "Vermin",
] as const;

export const BESTIARY_DIFFICULTY: Record<BestiaryDifficulty, string> = {
  1: "Trivial",
  2: "Easy",
  3: "Medium",
  4: "Hard",
  5: "Challenging",
};

export const BESTIARY_DIFFICULTIES = Object.keys(BESTIARY_DIFFICULTY).map(
  Number
) as BestiaryDifficulty[];

export const BESTIARY_STAGE_FILTER_LABEL: Record<BestiaryStageFilter, string> = {
  all: "All",
  not_completed: "Not Completed",
  completed: "Completed",
};

export const BESTIARY_STAGE = {
  STARTED: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
} as const satisfies Record<string, BestiaryStage>;
