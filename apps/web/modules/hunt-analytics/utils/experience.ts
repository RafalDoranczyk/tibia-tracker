import type { sortMonstersByExp } from "./sortMonstersByExp";

export function calculateTimeToNextLevel(xpToNextLevel: number | undefined, totalExp: number) {
  if (!xpToNextLevel || totalExp <= 0) return null;

  const hours = xpToNextLevel / totalExp;
  const h = Math.floor(hours);
  const m = Math.round((hours % 1) * 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function calculateTotalExp(
  monsters: ReturnType<typeof sortMonstersByExp>,
  selectedPreyIds: number[],
  fallbackXp: number,
  multiplier: number
): number {
  let exp = 0;

  monsters.forEach((monster) => {
    const isPrey = selectedPreyIds.includes(monster.monster_id);
    exp += monster.baseTotalExp + (isPrey ? monster.preyBonusExp : 0);
  });

  return Math.round(exp) || Math.round(fallbackXp * multiplier);
}

export function getExpForLevel(level: number): number {
  if (level <= 1) return 0;

  const L = level;
  const totalExp = (50 / 3) * (L ** 3 - 6 * L ** 2 + 17 * L - 12);

  return Math.floor(totalExp);
}

export function getExpNextLevel(currentLevel: number): number {
  const currentExp = getExpForLevel(currentLevel);
  const nextExp = getExpForLevel(currentLevel + 1);

  return nextExp - currentExp;
}
