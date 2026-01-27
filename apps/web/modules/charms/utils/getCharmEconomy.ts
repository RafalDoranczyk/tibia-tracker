import type { CharmLevel, CharmWithProgress } from "../types";

export function getCharmTotalCostToLevel(
  charm: CharmWithProgress,
  targetLevel: CharmLevel
): number {
  let total = 0;

  for (let l = 1; l <= targetLevel; l++) {
    // @ts-ignore
    total += charm.levels[l].cost;
  }

  return total;
}

export function getCharmEffectAtLevel(charm: CharmWithProgress, level: CharmLevel) {
  // @ts-ignore
  return charm.levels[level].effect;
}

export function canAffordCharmLevel(
  charm: CharmWithProgress,
  targetLevel: CharmLevel,
  availablePoints: number
) {
  const totalCost = getCharmTotalCostToLevel(charm, targetLevel);
  return availablePoints >= totalCost;
}

// Step-Based for cards
export function getCharmNextLevelCost(charm: CharmWithProgress): number | null {
  const nextLevel = charm.progress.unlocked ? charm.progress.level + 1 : 1;

  if (nextLevel < 1 || nextLevel > 3) return null;

  return charm.levels[nextLevel as 1 | 2 | 3].cost;
}

export function canAffordNextCharmLevel(charm: CharmWithProgress, availablePoints: number) {
  const cost = getCharmNextLevelCost(charm);
  return cost !== null && availablePoints >= cost;
}
