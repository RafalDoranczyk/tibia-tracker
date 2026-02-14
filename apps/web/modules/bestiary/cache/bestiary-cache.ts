import type { BestiaryClass } from "../schemas";

export const BestiaryCache = {
  keys: {
    summary: "bestiary-summary" as const,
    classSummary: "bestiary-class-summary" as const,
  },
  tags: {
    summary: (characterId: string) => `bestiary-summary-${characterId}` as const,
    classSummary: (characterId: string, bestiaryClass: BestiaryClass) =>
      `bestiary-class-${characterId}-${bestiaryClass}` as const,

    allCharacterData: (characterId: string) => `bestiary-all-${characterId}` as const,
  },
} as const;
