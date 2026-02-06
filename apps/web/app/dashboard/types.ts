export type SearchParams = Record<string, string | string[] | undefined>;

type WithCharacterId = {
  characterId: string;
};

export type CharacterLayoutProps = {
  params: Promise<WithCharacterId>;
};

export type CharacterPageProps<TParams extends Record<string, string> = Record<string, never>> = {
  params: Promise<TParams & WithCharacterId>;
  searchParams: Promise<SearchParams>;
};
