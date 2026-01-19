import { BESTIARY_FULL_STAGE, BESTIARY_STAGE_1, BESTIARY_STAGE_2 } from "../constants";

type BestiaryKills = {
  stage1: number;
  stage2: number;
  stage3: number;
};

export const calculateBestiaryStage = (kills: number, thresholds: BestiaryKills): number => {
  if (kills >= thresholds.stage3) return BESTIARY_FULL_STAGE;
  if (kills >= thresholds.stage2) return BESTIARY_STAGE_2;
  return BESTIARY_STAGE_1;
};
