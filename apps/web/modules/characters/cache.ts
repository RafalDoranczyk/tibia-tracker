export const CharactersCache = {
  characterList: (userId: string) => `user-list-characters-${userId}`,
  byName: (name: string) => `character-by-name-${name}`,
};
