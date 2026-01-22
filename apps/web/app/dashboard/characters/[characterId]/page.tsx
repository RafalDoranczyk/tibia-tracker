import { fetchCharacters } from "@/modules/characters";

import type { CharacterPageProps } from "../types";

export default async function CharacterPage({ params }: CharacterPageProps) {
  const awaitedParams = await params;
  const a = await fetchCharacters();

  const character = a.find((el) => el.id === awaitedParams.characterId);

  return (
    <div>
      Single character page
      {character && <div>{character.name}</div>}
    </div>
  );
}
