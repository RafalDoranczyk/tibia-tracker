import { ITEM_IMAGES, SCROLL_IMAGES } from "../../images";
import type { Scroll, ScrollItem } from "../../types";

// Scroll items
const elvishTalisman: ScrollItem = {
  key: "elvish_talisman",
  name: "Elvish Talisman",
  quantity: 25,
  imageUrl: ITEM_IMAGES.elvish_talisman,
};

const brokenShamanicStaff: ScrollItem = {
  key: "broken_shamanic_staff",
  name: "Broken Shamanic Staff",
  quantity: 15,
  imageUrl: ITEM_IMAGES.broken_shamanic_staff,
};

const strandOfMedusaHair: ScrollItem = {
  key: "strand_of_medusa_hair",
  name: "Strand of Medusa Hair",
  quantity: 15,
  imageUrl: ITEM_IMAGES.strand_of_medusa_hair,
};

const elvenScoutingGlass: ScrollItem = {
  key: "elven_scouting_glass",
  name: "Elven Scouting Glass",
  quantity: 25,
  imageUrl: ITEM_IMAGES.elven_scouting_glass,
};

const elvenHoof: ScrollItem = {
  key: "elven_hoof",
  name: "Elven Hoof",
  quantity: 20,
  imageUrl: ITEM_IMAGES.elven_hoof,
};

const metalSpike: ScrollItem = {
  key: "metal_spike",
  name: "Metal Spike",
  quantity: 15,
  imageUrl: ITEM_IMAGES.metal_spike,
};

const tarantulaEgg: ScrollItem = {
  key: "tarantula_egg",
  name: "Tarantula Egg",
  quantity: 25,
  imageUrl: ITEM_IMAGES.tarantula_egg,
};

const mantassinTail: ScrollItem = {
  key: "mantassin_tail",
  name: "Mantassin Tail",
  quantity: 20,
  imageUrl: ITEM_IMAGES.mantassin_tail,
};

const goldBrocadedCloth: ScrollItem = {
  key: "gold_brocaded_cloth",
  name: "Gold-Brocaded Cloth",
  quantity: 15,
  imageUrl: ITEM_IMAGES.gold_brocaded_cloth,
};

const lionsMane: ScrollItem = {
  key: "lions_mane",
  name: "Lion's Mane",
  quantity: 25,
  imageUrl: ITEM_IMAGES.lions_mane,
};

const moohtahShell: ScrollItem = {
  key: "moohtah_shell",
  name: "Moohtah Shell",
  quantity: 25,
  imageUrl: ITEM_IMAGES.moohtah_shell,
};

const warCrystal: ScrollItem = {
  key: "war_crystal",
  name: "War Crystal",
  quantity: 5,
  imageUrl: ITEM_IMAGES.war_crystal,
};

const cyclopsToe: ScrollItem = {
  key: "cyclops_toe",
  name: "Cyclops Toe",
  quantity: 20,
  imageUrl: ITEM_IMAGES.cyclops_toe,
};

const ogreNoseRing: ScrollItem = {
  key: "ogre_nose_ring",
  name: "Ogre Nose Ring",
  quantity: 15,
  imageUrl: ITEM_IMAGES.ogre_nose_ring,
};

const warmastersWristguards: ScrollItem = {
  key: "warmasters_wristguards",
  name: "Warmaster's Wristguards",
  quantity: 10,
  imageUrl: ITEM_IMAGES.warmasters_wristguards,
};

const orcTooth: ScrollItem = {
  key: "orc_tooth",
  name: "Orc Tooth",
  quantity: 20,
  imageUrl: ITEM_IMAGES.orc_tooth,
};

const battleStone: ScrollItem = {
  key: "battle_stone",
  name: "Battle Stone",
  quantity: 25,
  imageUrl: ITEM_IMAGES.battle_stone,
};

const moohtantHorn: ScrollItem = {
  key: "moohtant_horn",
  name: "Moohtant Horn",
  quantity: 20,
  imageUrl: ITEM_IMAGES.moohtant_horn,
};

// Scrolls

const epiphanyPowerfulScroll: Scroll = {
  key: "scroll_epiphany_powerful",
  name: "Epiphany Powerful",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_epiphany_powerful,
  color: "#EF6C00",
  items: [elvishTalisman, brokenShamanicStaff, strandOfMedusaHair],
};

const epiphanyIntricateScroll: Scroll = {
  key: "scroll_epiphany_intricate",
  name: "Epiphany Intricate",
  craftMethods: ["items"],
  color: "#FB8C00",
  items: [elvishTalisman, brokenShamanicStaff],
  imageUrl: SCROLL_IMAGES.scroll_epiphany_intricate,
  scrollType: "intricate",
};

const precisionScroll: Scroll = {
  key: "scroll_precise",
  name: "Precision",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_precise,
  color: "#00897B",
  items: [elvenScoutingGlass, elvenHoof, metalSpike],
};

const punchScroll: Scroll = {
  key: "scroll_punch",
  name: "Punch",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_punch,
  color: "#6D4C41",
  items: [tarantulaEgg, mantassinTail, goldBrocadedCloth],
};

const slashScroll: Scroll = {
  key: "scroll_slash",
  name: "Slash",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_slash,
  color: "#9E9E9E",
  items: [lionsMane, moohtahShell, warCrystal],
};

const bashScroll: Scroll = {
  key: "scroll_bash",
  name: "Bash",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_bash,
  color: "#283593",
  items: [cyclopsToe, ogreNoseRing, warmastersWristguards],
};

const chopScroll: Scroll = {
  key: "scroll_chop",
  name: "Chop",
  craftMethods: ["items"],
  color: "#827717",
  imageUrl: SCROLL_IMAGES.scroll_chop,
  items: [battleStone, orcTooth, moohtantHorn],
};

export const skillScrolls = [
  epiphanyPowerfulScroll,
  epiphanyIntricateScroll,
  precisionScroll,
  punchScroll,
  slashScroll,
  bashScroll,
  chopScroll,
];
