import type { HuntSpot } from "../schemas";

export function sortMonstersByExp(
  monstersPerHour: HuntSpot["avg_monsters_per_hour"],
  currentMultiplier: number
) {
  if (!monstersPerHour) return [];

  return [...monstersPerHour]
    .map((monster) => {
      const baseTotalExp = monster.exp * monster.avg_count_per_hour * currentMultiplier;
      const preyBonusExp = baseTotalExp * 0.4;
      return { ...monster, baseTotalExp, preyBonusExp };
    })
    .sort((a, b) => b.baseTotalExp - a.baseTotalExp);
}
