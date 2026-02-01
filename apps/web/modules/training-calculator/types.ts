import type { CharacterVocation } from "@/modules/characters";

import type {
  EXERCISE_DUMMIES,
  LOYALTY_MARKS,
  SKILL_VARIANTS,
  SKILL_WEAPON_TYPES,
  VOCATION_ONLINE_TRAINING_CONFIG,
} from "./constants";

export type CharacterSkillVariant = (typeof SKILL_VARIANTS)[number];
export type ExerciseWeaponType = (typeof SKILL_WEAPON_TYPES)[number]["label"];
export type LoyaltyPointValues = (typeof LOYALTY_MARKS)[number]["value"];

export type OnlineTrainingCharacterState = {
  vocation: CharacterVocation;
  skill: CharacterSkillVariant;
  currentSkill: number;
  targetSkill: number;
  percentLeft: number;
  loyaltyPoints: LoyaltyPointValues;
};

export type VocationOnlineTrainingConfig =
  (typeof VOCATION_ONLINE_TRAINING_CONFIG)[CharacterVocation];

export type ExerciseDummy = (typeof EXERCISE_DUMMIES)[number];
