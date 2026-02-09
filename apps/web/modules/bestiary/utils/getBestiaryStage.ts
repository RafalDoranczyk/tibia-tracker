import { BESTIARY_STAGE } from "../constants";
import { type BestiaryStage, BestiaryStageSchema, type Monster } from "../schemas";

export function getBestiaryStage(
  kills: number,
  thresholds: Monster["bestiary_kills"]
): BestiaryStage {
  if (kills >= thresholds.stage3) {
    return BestiaryStageSchema.parse(BESTIARY_STAGE.COMPLETED);
  }

  if (kills >= thresholds.stage2) {
    return BestiaryStageSchema.parse(BESTIARY_STAGE.IN_PROGRESS);
  }

  return BestiaryStageSchema.parse(BESTIARY_STAGE.STARTED);
}
