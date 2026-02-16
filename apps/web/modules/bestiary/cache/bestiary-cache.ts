import type { BestiaryClass } from "../schemas";

export const BestiaryCache = {
  summary: (characterId: string) => `bestiary-summary-${characterId}` as const,
  classSummary: (characterId: string, bestiaryClass: BestiaryClass) =>
    `bestiary-class-${characterId}-${bestiaryClass}` as const,
} as const;
