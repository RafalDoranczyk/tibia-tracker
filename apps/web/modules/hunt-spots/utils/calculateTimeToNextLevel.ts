export function calculateTimeToNextLevel(xpToNextLevel: number | undefined, totalExp: number) {
  if (!xpToNextLevel || totalExp <= 0) return null;

  const hours = xpToNextLevel / totalExp;
  const h = Math.floor(hours);
  const m = Math.round((hours % 1) * 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
