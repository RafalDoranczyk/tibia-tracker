import type { CharacterVocation } from "../characters";
import type { useOnlineTrainingState } from "./hooks/useOnlineTrainingState";

export type CharacterSkillVariant = "melee" | "distance" | "shield" | "fist" | "ml";
export type ExerciseDummy = "regular" | "house";
export type ExerciseWeaponType = "lasting" | "durable" | "regular";

export type LoyaltyPointValues =
  | 0
  | 360
  | 720
  | 1080
  | 1440
  | 1800
  | 2160
  | 2520
  | 2880
  | 3240
  | 3600;

export type OnlineTrainingCharacterState = {
  vocation: CharacterVocation;
  skill: CharacterSkillVariant;
  currentSkill: number;
  targetSkill: number;
  percentLeft: number;
  loyaltyPoints: LoyaltyPointValues;
};

export type VocationOnlineTrainingConfig = {
  [key in CharacterSkillVariant]?: {
    constant: number;
    base: number;
    rate: number;
    multiplier?: number; // Specific for mages
    timeMult?: number;
    offset?: number;
  };
};

export type UseOnlineTrainingState = ReturnType<typeof useOnlineTrainingState>;
