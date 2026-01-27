import BlankImbuementScroll from "./blank_imbuement_scroll.gif";
import Calculator from "./calculator.png";
import Character from "./character.png";
import Characters from "./characters.png";
import Charms from "./charms.png";
import HuntBow from "./hunt_bow.png";
import HuntBowGold from "./hunt_bow_gold.png";
import Monster from "./the_monster.gif";
import Training from "./training.png";

export const NAVIGATION_IMAGES = {
  scroll: BlankImbuementScroll,
  monster: Monster,
  hunt: HuntBow,
  huntGold: HuntBowGold,
  character: Character,
  characters: Characters,
  calculator: Calculator,
  training: Training,
  charms: Charms,
} as const;

export type NavigationImageKey = keyof typeof NAVIGATION_IMAGES;
