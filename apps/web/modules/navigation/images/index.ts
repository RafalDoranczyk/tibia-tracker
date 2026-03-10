import BlankImbuementScroll from "./blank_imbuement_scroll.gif";
import Character from "./character.png";
import Characters from "./characters.png";
import Charms from "./charms.png";
import Drome from "./drome.gif";
import HuntBow from "./hunt_bow.png";
import HuntBowGold from "./hunt_bow_gold.png";
import Rashid from "./rashid.gif";
import Monster from "./the_monster.gif";
import Training from "./training.png";

export const NAVIGATION_IMAGES = {
  scroll: BlankImbuementScroll,
  monster: Monster,
  hunt: HuntBow,
  huntGold: HuntBowGold,
  character: Character,
  characters: Characters,
  training: Training,
  charms: Charms,
  rashid: Rashid,
  drome: Drome,
} as const;

export type NavigationImageKey = keyof typeof NAVIGATION_IMAGES;
