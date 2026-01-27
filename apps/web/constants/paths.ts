const DASHBOARD_PATH = "/dashboard";

// Specific paths for a character
const character = (characterId: string) => {
  const base = `${DASHBOARD_PATH}/characters/${characterId}`;

  return {
    OVERVIEW: base,
    BESTIARY: `${base}/bestiary`,
    HUNT_PLACES: `${base}/hunt-places`,
    CHARMS: `${base}/charms`,
    HUNT_SESSIONS: {
      LIST: `${base}/hunt-sessions`,
      NEW: `${base}/hunt-sessions/new`,
      EDIT: (sessionId: number) => `${base}/hunt-sessions/${sessionId}`,
    },
  };
};

export const PATHS = {
  CHARACTER: character,
  DASHBOARD: `${DASHBOARD_PATH}`,
  SETTINGS: `${DASHBOARD_PATH}/settings`,
  CHARACTERS: `${DASHBOARD_PATH}/characters`,
  IMBUING: `${DASHBOARD_PATH}/imbuing`,
  STAMINA_CALCULATOR: `${DASHBOARD_PATH}/stamina-calculator`,
  TRAINING_CALCULATOR: `${DASHBOARD_PATH}/training-calculator`,
} as const;
