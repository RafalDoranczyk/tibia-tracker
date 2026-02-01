import { BESTIARY_FULL_STAGE, BESTIARY_STAGE_1, BESTIARY_STAGE_2 } from "../constants";
import type { Monster } from "../schemas";

export const getBestiaryStage = (kills: number, thresholds: Monster["bestiary_kills"]): number => {
  if (kills >= thresholds.stage3) return BESTIARY_FULL_STAGE;
  if (kills >= thresholds.stage2) return BESTIARY_STAGE_2;
  return BESTIARY_STAGE_1;
};
