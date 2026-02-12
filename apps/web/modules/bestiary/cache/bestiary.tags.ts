import type { BestiaryClass } from "../schemas";

export const BestiaryCacheTags = {
  summary: (characterId: string) => `bestiary-summary:${characterId}` as const,

  classSummary: (characterId: string, bestiaryClass: BestiaryClass) =>
    `bestiary-class-summary:${characterId}:${bestiaryClass}` as const,
};
