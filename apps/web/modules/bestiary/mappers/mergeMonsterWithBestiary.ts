import type { CharacterBestiary, Monster, MonsterWithCharacterProgress } from "../schemas";

export function mergeMonstersWithBestiary(
  monsters: Monster[],
  bestiary: CharacterBestiary[]
): MonsterWithCharacterProgress[] {
  const bestiaryMap = new Map(bestiary.map((entry) => [entry.monster_id, entry]));

  return monsters.map((monster) => {
    const progress = bestiaryMap.get(monster.id);

    return {
      ...monster,
      kills: progress?.kills ?? 0,
      stage: progress?.stage ?? 0,
      has_soul: progress?.has_soul ?? false,
    };
  });
}
