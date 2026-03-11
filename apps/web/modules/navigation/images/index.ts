import Character from "./character.webp";
import Characters from "./characters.webp";
import Charms from "./charms.webp";
import Drome from "./drome.webp";
import HuntBow from "./hunt_bow.webp";
import HuntBowGold from "./hunt_bow_gold.webp";
import Imbuing from "./imbuing.webp";
import Logout from "./logout.webp";
import Monster from "./monster.webp";
import Rashid from "./rashid.webp";
import Training from "./training.webp";

export const NAVIGATION_IMAGES = {
  scroll: Imbuing,
  monster: Monster,
  hunt: HuntBow,
  huntGold: HuntBowGold,
  character: Character,
  characters: Characters,
  training: Training,
  charms: Charms,
  rashid: Rashid,
  drome: Drome,
  logout: Logout,
} as const;
