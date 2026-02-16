import type { CharacterCharmWithProgress, CharmLevel } from "../schemas";

export function getCharmTotalCostToLevel(
  charm: CharacterCharmWithProgress,
  targetLevel: CharmLevel
): number {
  let total = 0;

  for (let l = 1; l <= targetLevel; l++) {
    total += charm.levels[l as CharmLevel].cost;
  }

  return total;
}

export function getCharmEffectAtLevel(charm: CharacterCharmWithProgress, level: CharmLevel) {
  return charm.levels[level].effect;
}

export function getCharmNextLevelCost(charm: CharacterCharmWithProgress): number | null {
  const currentLevel = charm.progress.level || 0;
  const nextLevel = currentLevel + 1;

  if (nextLevel > 3) return null;

  return charm.levels[nextLevel as CharmLevel].cost;
}

export function canAffordNextCharmLevel(
  charm: CharacterCharmWithProgress,
  availablePoints: number
) {
  const cost = getCharmNextLevelCost(charm);
  return cost !== null && availablePoints >= cost;
}
