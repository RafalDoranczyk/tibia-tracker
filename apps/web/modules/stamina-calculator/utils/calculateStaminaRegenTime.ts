import { FULL_STAMINA_MINUTES, ORANGE_STAMINA_MINUTES } from "../constants";

export function calculateStaminaRegenTime(current: number, target = FULL_STAMINA_MINUTES * 60) {
  let time = 0;
  let stamina = current;

  const orangeEnd = ORANGE_STAMINA_MINUTES * 60;

  if (stamina < orangeEnd) {
    const orange = Math.min(target, orangeEnd) - stamina;
    time += orange * 3;
    stamina += orange;
  }

  if (stamina < target) {
    const green = target - stamina;
    time += green * 6;
  }

  return time;
}
