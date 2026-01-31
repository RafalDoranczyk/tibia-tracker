import type { CharmLevel } from "./schemas";

export const MINOR_CHARM_PROMOTION_BONUS = 100;
export const CHARM_MAX_LEVEL = 3;

// Each unlocked major charm level grants a fixed number of minor charm points

export const MINOR_CHARM_POINTS_PER_MAJOR_LEVEL: Record<CharmLevel, number> = {
  1: 50,
  2: 150,
  3: 350,
};
