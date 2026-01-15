export function calculateXpMultiplier(activeBoosts: string[]): number {
  const baseBonus =
    1 + (activeBoosts.includes("boost") ? 0.5 : 0) + (activeBoosts.includes("double") ? 1 : 0);

  return baseBonus * (activeBoosts.includes("stamina") ? 1.5 : 1);
}
