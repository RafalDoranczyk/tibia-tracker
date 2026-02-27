import type { sortMonstersByExp } from "./sortMonstersByExp";

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
