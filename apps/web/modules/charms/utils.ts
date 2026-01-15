import type { CharacterCharmWithCharm, Charm, CharmWithStatus } from "./schemas";

export function mergeCharmsWithStatus(
  allCharms: Charm[],
  characterCharms: CharacterCharmWithCharm[]
): CharmWithStatus[] {
  const unlocked = characterCharms.map((cc) => ({
    ...cc.charm,
    unlocked: true,
    level: cc.level,
    unlocked_at: cc.unlocked_at,
  }));

  const unlockedIds = new Set(unlocked.map((c) => c.id));

  const locked = allCharms
    .filter((c) => !unlockedIds.has(c.id))
    .map((c) => ({ ...c, unlocked: false, level: 0, unlocked_at: null }));

  return [...unlocked, ...locked];
}
