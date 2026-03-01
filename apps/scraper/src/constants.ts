// Worlds to scrape highscores for - can be expanded to include more worlds as needed
export const WORLDS = ["Bona"];
export type WorldName = (typeof WORLDS)[number];

// Each vocation has 20 pages of highscores, with 50 players per page, so we can get up to 1000 players per vocation
export const PAGES_PER_VOCATION = 20;

export const VOCATION_MAP = {
  None: 1,
  Druid: 2,
  Knight: 3,
  Paladin: 4,
  Sorcerer: 5,
  Monk: 6,
};
export const VOCATION_IDS = Object.values(VOCATION_MAP);

export type VocationName = keyof typeof VOCATION_MAP;
export type VocationId = (typeof VOCATION_MAP)[VocationName];
