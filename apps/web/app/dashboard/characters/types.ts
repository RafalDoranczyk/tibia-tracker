type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// Prop characterId is required in the params for all character pages
export type CharacterPageProps<TParams extends Record<string, string> = { characterId: string }> = {
  params: Promise<TParams & { characterId: string }>;
  searchParams: SearchParams;
};
