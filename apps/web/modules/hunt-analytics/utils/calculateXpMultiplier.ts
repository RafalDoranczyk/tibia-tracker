import type { ActiveBoost } from "../types";

const XP_BONUSES = {
  BASE: 1,
  XP_BOOST: 0.5, // Store Boost (+50%)
  DOUBLE_XP: 1.0, // Double XP Event (+100%)
  STAMINA_BONUS: 1.5, // Green Stamina (x1.5)
  CAKE_EVENT: 0.5, // Cake Event (+50%)
} as const;

export function calculateXpMultiplier(activeBoosts: ActiveBoost[]): number {
  const hasBoost = activeBoosts.includes("boost");
  const hasDouble = activeBoosts.includes("double");
  const hasStamina = activeBoosts.includes("stamina");
  const hasCakeEvent = activeBoosts.includes("cake");

  const baseMultiplier =
    XP_BONUSES.BASE +
    (hasBoost ? XP_BONUSES.XP_BOOST : 0) +
    (hasDouble ? XP_BONUSES.DOUBLE_XP : 0) +
    (hasCakeEvent ? XP_BONUSES.CAKE_EVENT : 0);

  const staminaModifier = hasStamina ? XP_BONUSES.STAMINA_BONUS : 1;

  return baseMultiplier * staminaModifier;
}
