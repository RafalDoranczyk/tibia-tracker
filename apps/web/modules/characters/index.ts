// ======================
// UI – public components
// ======================
export { CharactersView } from "./components/CharactersView";

// ======================
// Providers and hooks
// ======================
export { useActiveCharacterDetails } from "./hooks/useActiveCharacterDetails";
export {
  ActiveCharacterProvider,
  useActiveCharacter,
  useRequiredCharacterId,
} from "./providers/ActiveCharacterProvider";
export { CharactersProvider, useCharacters } from "./providers/CharactersProvider";

// ======================
// Shared
// ======================

export {
  type Character,
  CharacterIDSchema,
  type CharacterVocation,
} from "./schemas";
