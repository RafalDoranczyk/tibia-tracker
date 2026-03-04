import type { BestiaryStage, Monster } from "@repo/database";
import { BESTIARY_STAGE } from "../schemas";

export function calculateBestiaryStage(
  kills: number,
  thresholds: Monster["bestiary_kills"]
): BestiaryStage {
  if (kills >= thresholds.stage3) {
    return BESTIARY_STAGE.COMPLETED;
  }

  if (kills >= thresholds.stage2) {
    return BESTIARY_STAGE.IN_PROGRESS;
  }

  return BESTIARY_STAGE.STARTED;
}
