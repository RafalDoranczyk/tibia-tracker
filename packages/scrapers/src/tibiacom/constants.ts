export const HIGHSCORE_URL = "https://www.tibia.com/community/?subtopic=highscores";

// Worlds to scrape highscores for - can be expanded to include more worlds as needed
export const WORLDS = ["Bona"] as const;
export type WorldName = (typeof WORLDS)[number];

// Each vocation has 20 pages of highscores, with 50 players per page, so we can get up to 1000 players per vocation
export const PAGES_PER_VOCATION = 20;

export const VOCATION_MAP = {
  // 1: 'None',
  2: "Knight",
  3: "Paladin",
  4: "Sorcerer",
  // 5: 'Druid',
  // 6: 'Monk',
};

export const VOCATION_IDS = Object.keys(VOCATION_MAP).map(Number) as VocationId[];

export type VocationId = keyof typeof VOCATION_MAP;
export type VocationName = (typeof VOCATION_MAP)[VocationId];
