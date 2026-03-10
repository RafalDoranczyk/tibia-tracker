import Drome from "./drome.gif";
import Rashid from "./rashid.gif";

export const NAVIGATION_IMAGES = {
  rashid: Rashid,
  drome: Drome,
} as const;

export type NavigationImageKey = keyof typeof NAVIGATION_IMAGES;
