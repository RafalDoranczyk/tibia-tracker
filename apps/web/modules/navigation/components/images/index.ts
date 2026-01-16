import BlankImbuementScroll from "./blank_imbuement_scroll.gif";

export const NAVIGATION_IMAGES = {
  scroll: BlankImbuementScroll,
} as const;

export type NavigationImageKey = keyof typeof NAVIGATION_IMAGES;
