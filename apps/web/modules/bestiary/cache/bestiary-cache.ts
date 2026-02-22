import type { MonsterClass } from "@/modules/monsters";

export const BestiaryCache = {
  summary: (characterId: string) => `bestiary-summary-${characterId}` as const,
  classSummary: (characterId: string, bestiaryClass: MonsterClass) =>
    `bestiary-class-${characterId}-${bestiaryClass}` as const,
} as const;
