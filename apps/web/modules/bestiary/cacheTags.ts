export const BestiaryCacheTags = {
  summary: (characterId: string) => `bestiary-summary:${characterId}`,
  classSummary: (characterId: string, bestiaryClass: string) =>
    `bestiary-class-summary:${characterId}:${bestiaryClass}`,
  monsters: (characterId: string) => `bestiary-monsters:${characterId}`,
  charms: (characterId: string) => `bestiary-charms:${characterId}`,
} as const;
