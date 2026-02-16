export const CharmCache = {
  list: "charm-list-all",
  characterList: (characterId: string) => `charm-list-character-${characterId}`,
  characterEconomy: (characterId: string) => `charm-economy-character-${characterId}`,
} as const;
