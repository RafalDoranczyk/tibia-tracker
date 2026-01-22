export type CharacterRouteParams = {
  characterId: string;
};

export type CharacterSearchParams = Record<string, string | string[] | undefined>;

export type CharacterPageProps = {
  params: Promise<CharacterRouteParams>;
  searchParams?: Promise<CharacterSearchParams>;
};
