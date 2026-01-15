const ROOT_PATH = "/dashboard";

const character = (characterId: string) => {
  const base = `${ROOT_PATH}/characters/${characterId}`;

  return {
    ROOT: base,

    OVERVIEW: base,
    CHARMS: `${base}/charms`,
    BESTIARY: `${base}/bestiary`,

    HUNT_SESSIONS: {
      LIST: `${base}/hunt-sessions`,
      NEW: `${base}/hunt-sessions/new`,
      EDIT: (sessionId: string | number) => `${base}/hunt-sessions/${sessionId}`,
    },

    SPOTS: `${base}/hunt-spots`,

    UTILITIES: {
      IMBUING: `${base}/imbuing`,
    },
  };
};

export const PATHS = {
  DASHBOARD: ROOT_PATH,
  SETTINGS: `${ROOT_PATH}/settings`,
  CHARACTER: character,
} as const;
