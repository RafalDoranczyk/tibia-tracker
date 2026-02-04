import {
  DOUBLE_EVENT_BONUS,
  HOUSE_DUMMY_BONUS,
  LOYALTY_POINT_STEP,
  VOCATION_ONLINE_TRAINING_CONFIG,
} from "../constants";
import type { UseOnlineTrainingState } from "../hooks/useOnlineTrainingState";
import type { ExerciseDummy, ExerciseWeaponType, LoyaltyPointValues } from "../types";

// --- HELPERS ---
function getLoyaltyBonus(loyaltyPoints: LoyaltyPointValues) {
  return 1 + Math.floor(loyaltyPoints / LOYALTY_POINT_STEP) * 0.05;
}

function getDummyBonus(dummyType?: ExerciseDummy) {
  if (dummyType === "house") return HOUSE_DUMMY_BONUS;
  return 1.0;
}

function getDoubleEventBonus(isDoubleEvent: boolean) {
  return isDoubleEvent ? DOUBLE_EVENT_BONUS : 1.0;
}

function getWeaponsNeeded(totalCharges: number): Record<ExerciseWeaponType, number> {
  let remaining = totalCharges;

  const lasting = Math.floor(remaining / 14400);
  remaining %= 14400;

  const durable = Math.floor(remaining / 1800);
  remaining %= 1800;

  const regular = Math.ceil(remaining / 500);

  return { lasting, durable, regular };
}

function formatTibiaTime(seconds: number) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (d > 0) return `${d} days, ${h} hrs, ${m} mins, ${s} secs`;
  if (h > 0) return `${h} hrs, ${m} mins, ${s} secs`;
  if (m > 0) return `${m} mins, ${s} secs`;
  return `${s} secs`;
}

type ExerciseTrainingParams = UseOnlineTrainingState["character"] & {
  doubleEvent: boolean;
  dummyType?: ExerciseDummy;
};

// --- MAIN FUNCTION ---
export function calculateOnlineTraining(params: ExerciseTrainingParams) {
  const {
    vocation,
    skill,
    currentSkill,
    targetSkill,
    percentLeft,
    loyaltyPoints,
    dummyType,
    doubleEvent,
  } = params;

  // @ts-expect-error
  const config = VOCATION_ONLINE_TRAINING_CONFIG[vocation]?.[skill];
  if (!config) throw new Error(`Unsupported vocation/skill combination: ${vocation}/${skill}`);

  // 1. Calculate total points needed
  let totalPointsNeeded = 0;

  for (let level = currentSkill; level < targetSkill; level++) {
    const power = config.offset
      ? level - config.offset
      : skill === "ml" && (vocation === "sorcerer" || vocation === "druid")
        ? level - 1
        : level;

    let p = config.base * config.constant ** power;

    if (config.multiplier) p *= config.multiplier;

    totalPointsNeeded += level === currentSkill ? p * (percentLeft / 100) : p;
  }

  // 2. Bonuses and Rate
  const loyaltyBonus = getLoyaltyBonus(loyaltyPoints);
  const dummyBonus = getDummyBonus(dummyType);
  const doubleBonus = getDoubleEventBonus(doubleEvent);

  const finalRate = config.rate * loyaltyBonus * dummyBonus * doubleBonus;

  if (finalRate === 0) {
    return {
      totalPointsNeeded: 0,
      totalCharges: 0,
      timeFormatted: "0 secs",
      weaponsNeeded: { lasting: 0, durable: 0, regular: 0 },
    };
  }

  // 3. Time
  const timeMultiplier = config.timeMult || 1.0;
  const totalSeconds = (totalPointsNeeded / finalRate) * timeMultiplier;
  const totalCharges = Math.ceil(totalSeconds / 2);
  const weaponsNeeded = getWeaponsNeeded(totalCharges);

  return {
    totalCharges,
    weaponsNeeded,
    totalPointsNeeded: Math.round(totalPointsNeeded),
    timeFormatted: formatTibiaTime(totalSeconds),
  };
}
