const DASHBOARD_PATH = "/dashboard";

const character = (characterId: string) => {
  const base = `${DASHBOARD_PATH}/characters/${characterId}`;

  return {
    OVERVIEW: base,
    BESTIARY: `${base}/bestiary`,
    HUNT_PLACES: `${base}/hunt-places`,
    STAMINA_CALCULATOR: `${base}/stamina-calculator`,
    HUNT_SESSIONS: {
      LIST: `${base}/hunt-sessions`,
      NEW: `${base}/hunt-sessions/new`,
      EDIT: (sessionId: number) => `${base}/hunt-sessions/${sessionId}`,
    },
  };
};

export const PATHS = {
  DASHBOARD: `${DASHBOARD_PATH}`,
  SETTINGS: `${DASHBOARD_PATH}/settings`,
  CHARACTERS: `${DASHBOARD_PATH}/characters`,
  IMBUING: `${DASHBOARD_PATH}/imbuing`,
  CHARACTER: character,
} as const;
