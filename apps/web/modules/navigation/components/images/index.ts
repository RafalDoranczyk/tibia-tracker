import BlankImbuementScroll from "./blank_imbuement_scroll.gif";
import Character from "./character.png";
import Characters from "./characters.png";
import HuntBow from "./hunt_bow.png";
import Monster from "./the_monster.gif";

export const NAVIGATION_IMAGES = {
  scroll: BlankImbuementScroll,
  monster: Monster,
  hunt: HuntBow,
  home: HuntBow,
  character: Character,
  characters: Characters,
} as const;

export type NavigationImageKey = keyof typeof NAVIGATION_IMAGES;
