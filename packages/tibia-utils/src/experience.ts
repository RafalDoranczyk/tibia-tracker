// EXP calculations based on Tibia's official formula
export function getNeededExpForLevel(level: number): number {
  if (level <= 1) return 0;
  const L = level;
  // Tibia official EXP formula: (50/3) * (L^3 - 6L^2 + 17L - 12)
  return Math.floor((50 / 3) * (L ** 3 - 6 * L ** 2 + 17 * L - 12));
}

// Difference in EXP between the current and next level
export function getNeededExpForNextLevel(currentLevel: number): number {
  return getNeededExpForLevel(currentLevel + 1) - getNeededExpForLevel(currentLevel);
}

// Calculating time to level up
export function getNeededTimeForNextLevel(
  xpToNextLevel: number | undefined,
  expPerHour: number
): string | null {
  if (!xpToNextLevel || expPerHour <= 0) return null;

  const hours = xpToNextLevel / expPerHour;
  const h = Math.floor(hours);
  const m = Math.round((hours % 1) * 60);

  if (h > 999) return ">999h"; // Safeguard for very low exp/h
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export type LevelProgressData = {
  nextLevel: number;
  totalExpAtCurrentLevelStart: number;
  totalExpAtNextLevelStart: number;
  expRequiredToFinishLevel: number;
  expGainedInThisLevel: number;
  expMissing: number;
  progress: number;
  daysToLevel: number | null;
};

// Calculates all relevant data for level progress and time to next level based on current EXP and average daily gain
export function calculateLevelProgress(
  currentLevel: number,
  currentExp: number,
  averageDailyGain: number
): LevelProgressData {
  const nextLevel = currentLevel + 1;
  const totalAtCurrent = getNeededExpForLevel(currentLevel);
  const totalAtNext = getNeededExpForLevel(nextLevel);

  const required = totalAtNext - totalAtCurrent;
  const gained = currentExp - totalAtCurrent;
  const missing = totalAtNext - currentExp;

  const progress = Math.min(100, Math.max(0, (gained / required) * 100));
  const days = averageDailyGain > 100 ? Math.ceil(missing / averageDailyGain) : null;

  return {
    nextLevel,
    totalExpAtCurrentLevelStart: totalAtCurrent,
    totalExpAtNextLevelStart: totalAtNext,
    expRequiredToFinishLevel: required,
    expGainedInThisLevel: gained,
    expMissing: missing,
    progress,
    daysToLevel: days,
  };
}
