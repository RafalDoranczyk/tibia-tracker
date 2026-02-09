export const BestiaryCacheTags = {
  summary: (characterId: string) => `bestiary-summary:${characterId}`,
  classSummary: (characterId: string, bestiaryClass: string) =>
    `bestiary-class-summary:${characterId}:${bestiaryClass}`,
} as const;
