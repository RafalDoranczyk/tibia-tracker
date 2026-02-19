export const HuntSessionCache = {
  huntSessionList: (characterId: string) => `hunt-sessions-${characterId}` as const,
  huntSession: (sessionId: number) => `hunt-session-${sessionId}` as const,
} as const;
