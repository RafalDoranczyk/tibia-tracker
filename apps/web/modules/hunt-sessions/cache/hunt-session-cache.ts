export const HuntSessionCache = {
  monsters: "monster-list" as const,
  damageElements: "damage-elements" as const,
  preyBonuses: "prey-bonuses" as const,
  huntSessionList: (characterId: string) => `hunt-sessions-${characterId}` as const,
  huntSession: (sessionId: number) => `hunt-session-${sessionId}` as const,
} as const;
