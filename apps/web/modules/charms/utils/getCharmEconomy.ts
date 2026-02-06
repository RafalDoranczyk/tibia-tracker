import type { CharacterCharmWithProgress, CharmLevel } from "../schemas";

export function getCharmTotalCostToLevel(
  charm: CharacterCharmWithProgress,
  targetLevel: CharmLevel
): number {
  let total = 0;

  for (let l = 1; l <= targetLevel; l++) {
    total += charm.levels[l].cost;
  }

  return total;
}

export function getCharmEffectAtLevel(charm: CharacterCharmWithProgress, level: CharmLevel) {
  return charm.levels[level].effect;
}

export function canAffordCharmLevel(
  charm: CharacterCharmWithProgress,
  targetLevel: CharmLevel,
  availablePoints: number
) {
  const totalCost = getCharmTotalCostToLevel(charm, targetLevel);
  return availablePoints >= totalCost;
}

// Step-Based for cards
export function getCharmNextLevelCost(charm: CharacterCharmWithProgress): number | null {
  const nextLevel = charm.progress.unlocked ? charm.progress.level + 1 : 1;

  if (nextLevel < 1 || nextLevel > 3) return null;

  return charm.levels[nextLevel as 1 | 2 | 3].cost;
}

export function canAffordNextCharmLevel(
  charm: CharacterCharmWithProgress,
  availablePoints: number
) {
  const cost = getCharmNextLevelCost(charm);
  return cost !== null && availablePoints >= cost;
}
