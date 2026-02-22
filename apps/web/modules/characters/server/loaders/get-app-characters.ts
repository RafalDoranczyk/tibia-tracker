import type { AppCharacter } from "../../schemas";
import { getCharacterByName } from "./get-character-by-name";
import { getCharacterList } from "./get-character-list";

const NoLiveDataPlaceholder: AppCharacter = {
  id: "unknown",
  name: "Unknown",
  world: "Unknown",
  level: 0,
  vocation: "none",
  sex: "none",
  achievement_points: 0,
  residence: "Unknown",
  deaths: [],
  _cachedAt: new Date().toISOString(),
  synchronized_at: null,
  last_login: undefined,
};

export async function getAppCharacters(): Promise<AppCharacter[]> {
  const userCharacters = await getCharacterList();

  return Promise.all(
    userCharacters.map(async (char) => {
      try {
        const liveData = await getCharacterByName(char.name);

        if (!liveData) return { ...char, ...NoLiveDataPlaceholder };

        return {
          ...char,
          level: liveData.character.level,
          sex: liveData.character.sex,
          last_login: liveData.character.last_login,
          vocation: liveData.character.vocation,
          world: liveData.character.world,
          achievement_points: liveData.character.achievement_points,
          residence: liveData.character.residence,
          deaths: liveData.deaths ?? [],
          _cachedAt: liveData._cachedAt,
          synchronized_at: char.synchronized_at,
        };
      } catch (error) {
        console.error(`[Loader] Failed to fetch live data for ${char.name}:`, error);
        return { ...char, ...NoLiveDataPlaceholder };
      }
    })
  );
}
