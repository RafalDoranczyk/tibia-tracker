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
