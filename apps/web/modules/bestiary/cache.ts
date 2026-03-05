import type { MonsterClass } from "@repo/database";

export const BestiaryCache = {
  summary: (characterId: string) => `bestiary-summary-${characterId}` as const,
  classSummary: (characterId: string, bestiaryClass: MonsterClass) =>
    `bestiary-class-${characterId}-${bestiaryClass}` as const,
} as const;
