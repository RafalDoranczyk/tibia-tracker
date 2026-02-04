import { useActiveCharacter } from "../providers/ActiveCharacterProvider";
import { useCharacters } from "../providers/CharactersProvider";

export function useActiveCharacterDetails() {
  const { activeCharacterId } = useActiveCharacter();
  const { characters } = useCharacters();

  return characters.find((c) => c.id === activeCharacterId) ?? null;
}
