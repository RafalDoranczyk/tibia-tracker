import type { CharacterVocation } from "../characters/schemas";

/**
 * BONUSES
 */
export const DOUBLE_EVENT_BONUS = 2.0;
export const HOUSE_DUMMY_BONUS = 1.1;

/**
 * LOYALTY
 */
export const LOYALTY_POINT_STEP = 360;
export const MAX_LOYALTY_POINTS = 3600;

export const LOYALTY_MARKS = [
  { value: 0, label: "None" },
  { value: 360, label: "5%" },
  { value: 720, label: "10%" },
  { value: 1080, label: "15%" },
  { value: 1440, label: "20%" },
  { value: 1800, label: "25%" },
  { value: 2160, label: "30%" },
  { value: 2520, label: "35%" },
  { value: 2880, label: "40%" },
  { value: 3240, label: "45%" },
  { value: 3600, label: "50%" },
] as const;

/**
 * SKILLS
 */
export const SKILL_VARIANTS = ["melee", "distance", "shield", "fist", "ml"] as const;

export const ALLOWED_SKILLS_FOR_VOCATION: Record<
  CharacterVocation,
  readonly (typeof SKILL_VARIANTS)[number][]
> = {
  knight: ["melee", "ml", "shield"],
  paladin: ["distance", "ml"],
  sorcerer: ["ml"],
  druid: ["ml"],
  monk: ["fist", "ml", "melee"],
};

/**
 * EXERCISE WEAPONS
 */
export const SKILL_WEAPON_TYPES = [
  {
    label: "lasting",
    charges: 14400,
    seconds: 7200,
    formattedTime: "8h",
    price: 10_000_000,
  },
  {
    label: "durable",
    charges: 1800,
    seconds: 3600,
    formattedTime: "1h",
    price: 1_250_000,
  },
  {
    label: "regular",
    charges: 500,
    seconds: 1000,
    formattedTime: "16m 40sec",
    price: 347_222,
  },
] as const;

/**
 * EXERCISE DUMMIES
 */
export const EXERCISE_DUMMIES = ["regular", "house"] as const;

/**
 * DEFAULT STATE
 */
export const CHARACTER_ONLINE_TRAINING_DEFAULT = {
  vocation: "knight",
  skill: "melee",
  currentSkill: 50,
  targetSkill: 70,
  percentLeft: 100,
  loyaltyPoints: 360,
} as const;

/**
 * VOCATION CONFIG
 */
export const VOCATION_ONLINE_TRAINING_CONFIG = {
  sorcerer: {
    ml: {
      constant: 1.1,
      base: 1600,
      rate: 300,
      multiplier: 1.1,
    },
  },
  druid: {
    ml: {
      constant: 1.1,
      base: 1600,
      rate: 300,
      multiplier: 1.1,
    },
  },
  knight: {
    ml: {
      constant: 3.0,
      base: 1600,
      rate: 600 * 0.6,
      timeMult: 1.2,
    },
    melee: {
      constant: 1.1,
      base: 50,
      rate: 4.3373,
      timeMult: 1.2,
      offset: 10,
    },
    shield: {
      constant: 1.1,
      base: 50,
      rate: 4.3373,
      timeMult: 1.2,
      offset: 10,
    },
  },
  paladin: {
    ml: {
      constant: 1.4,
      base: 1600,
      rate: 600 * 0.6,
      timeMult: 1.2,
    },
    distance: {
      constant: 1.1,
      base: 20,
      rate: 1.7348,
      timeMult: 1.2,
      offset: 10,
    },
  },
  monk: {
    ml: {
      constant: 1.25,
      base: 1600,
      rate: 300,
    },
    fist: {
      constant: 1.1,
      base: 50,
      rate: 4.3373,
      timeMult: 1.2,
      offset: 10,
    },
    melee: {
      constant: 1.1,
      base: 50,
      rate: 4.3373,
      timeMult: 1.2,
      offset: 10,
    },
  },
} as const;
