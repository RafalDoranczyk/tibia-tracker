const DASHBOARD_ROOT = "/dashboard";
const CHARACTER_BASE = `${DASHBOARD_ROOT}/character`;
const CALCULATORS_ROOT = `${DASHBOARD_ROOT}/calculators`;

export const characterPaths = (characterId: string) => {
  const base = `${CHARACTER_BASE}/${characterId}`;

  return {
    OVERVIEW: base,
    BESTIARY: `${base}/bestiary`,
    HUNT_PLACES: `${base}/hunt-places`,
    CHARMS: `${base}/charms`,
    HUNT_SESSIONS: {
      LIST: `${base}/hunt-sessions`,
      NEW: `${base}/hunt-sessions/new`,
      EDIT: (sessionId: number | string) => `${base}/hunt-sessions/${sessionId}`,
    },
  } as const;
};

export type CharacterPaths = ReturnType<typeof characterPaths>;

export const PATHS = {
  DASHBOARD: DASHBOARD_ROOT,
  CHARACTER: characterPaths,
  CHARACTERS: `${DASHBOARD_ROOT}/characters`,
  CALCULATORS: {
    IMBUING: `${CALCULATORS_ROOT}/imbuing`,
    STAMINA: `${CALCULATORS_ROOT}/stamina`,
    TRAINING: `${CALCULATORS_ROOT}/training`,
  },
} as const;
