import type { CharacterVocation } from "@repo/database/global-characters";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CHARACTER_ONLINE_TRAINING_DEFAULT, MAX_LOYALTY_POINTS } from "../constants";
import type {
  CharacterSkillVariant,
  LoyaltyPointValues,
  OnlineTrainingCharacterState,
} from "../types";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const KEYS = {
  CHARACTER: "tibia-online-training-char",
  DUMMY: "tibia-online-training-dummy",
  EVENT: "tibia-online-training-event",
};

export function useOnlineTrainingState() {
  const [exerciseDummy, setExerciseDummy] = useLocalStorage(KEYS.DUMMY, false);
  const [doubleEvent, setDoubleEvent] = useLocalStorage(KEYS.EVENT, false);
  const [character, setCharacter] = useLocalStorage<OnlineTrainingCharacterState>(
    KEYS.CHARACTER,
    CHARACTER_ONLINE_TRAINING_DEFAULT
  );

  return {
    character,
    exerciseDummy,
    setExerciseDummy,
    doubleEvent,
    setDoubleEvent,
    setVocation: (vocation: CharacterVocation) => setCharacter((c) => ({ ...c, vocation })),
    setSkill: (skill: CharacterSkillVariant) => setCharacter((c) => ({ ...c, skill })),
    setVocationAndSkill: (vocation: CharacterVocation, skill: CharacterSkillVariant) => {
      setCharacter((c) => ({
        ...c,
        vocation,
        skill,
      }));
    },

    setCurrentSkill: (value: number) =>
      setCharacter((c) => ({
        ...c,
        currentSkill: clamp(value, 0, 999),
      })),

    setTargetSkill: (value: number) =>
      setCharacter((c) => ({
        ...c,
        targetSkill: clamp(value, 0, 999),
      })),

    setPercentLeft: (value: number) =>
      setCharacter((c) => ({
        ...c,
        percentLeft: clamp(value, 0, 100),
      })),

    setLoyalty: (value: LoyaltyPointValues) =>
      setCharacter((c) => ({
        ...c,
        loyaltyPoints: clamp(value, 0, MAX_LOYALTY_POINTS) as LoyaltyPointValues,
      })),
  };
}

export type UseOnlineTrainingState = ReturnType<typeof useOnlineTrainingState>;
