import { SKILL_WEAPON_TYPES } from "../constants";
import type { ExerciseWeaponType } from "../types";

export function calculateTrainingCost(
  breakdown: Record<ExerciseWeaponType, number>,
  tcPrice: number
) {
  const getPrice = (label: string) => SKILL_WEAPON_TYPES.find((w) => w.label === label)?.price || 0;

  const totalGold =
    breakdown.lasting * getPrice("lasting") +
    breakdown.durable * getPrice("durable") +
    breakdown.regular * getPrice("regular");

  const totalTC = Math.ceil(totalGold / tcPrice);

  return {
    totalGold,
    totalTC,
    formattedGold: `${totalGold.toLocaleString()} gp`,
    formattedTC: `${totalTC.toLocaleString()} TC`,
  };
}
