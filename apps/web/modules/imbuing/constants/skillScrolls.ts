import { ITEM_IMAGES, SCROLL_IMAGES } from "../images";
import type { ImbuingScroll, ImbuingScrollItem } from "../schemas";

// ImbuingScroll items
const elvishTalisman: ImbuingScrollItem = {
  key: "elvish_talisman",
  name: "Elvish Talisman",
  quantity: 25,
  imageUrl: ITEM_IMAGES.elvish_talisman,
};

const brokenShamanicStaff: ImbuingScrollItem = {
  key: "broken_shamanic_staff",
  name: "Broken Shamanic Staff",
  quantity: 15,
  imageUrl: ITEM_IMAGES.broken_shamanic_staff,
};

const strandOfMedusaHair: ImbuingScrollItem = {
  key: "strand_of_medusa_hair",
  name: "Strand of Medusa Hair",
  quantity: 15,
  imageUrl: ITEM_IMAGES.strand_of_medusa_hair,
};

const elvenScoutingGlass: ImbuingScrollItem = {
  key: "elven_scouting_glass",
  name: "Elven Scouting Glass",
  quantity: 25,
  imageUrl: ITEM_IMAGES.elven_scouting_glass,
};

const elvenHoof: ImbuingScrollItem = {
  key: "elven_hoof",
  name: "Elven Hoof",
  quantity: 20,
  imageUrl: ITEM_IMAGES.elven_hoof,
};

const metalSpike: ImbuingScrollItem = {
  key: "metal_spike",
  name: "Metal Spike",
  quantity: 15,
  imageUrl: ITEM_IMAGES.metal_spike,
};

const tarantulaEgg: ImbuingScrollItem = {
  key: "tarantula_egg",
  name: "Tarantula Egg",
  quantity: 25,
  imageUrl: ITEM_IMAGES.tarantula_egg,
};

const mantassinTail: ImbuingScrollItem = {
  key: "mantassin_tail",
  name: "Mantassin Tail",
  quantity: 20,
  imageUrl: ITEM_IMAGES.mantassin_tail,
};

const goldBrocadedCloth: ImbuingScrollItem = {
  key: "gold_brocaded_cloth",
  name: "Gold-Brocaded Cloth",
  quantity: 15,
  imageUrl: ITEM_IMAGES.gold_brocaded_cloth,
};

const lionsMane: ImbuingScrollItem = {
  key: "lions_mane",
  name: "Lion's Mane",
  quantity: 25,
  imageUrl: ITEM_IMAGES.lions_mane,
};

const moohtahShell: ImbuingScrollItem = {
  key: "moohtah_shell",
  name: "Moohtah Shell",
  quantity: 25,
  imageUrl: ITEM_IMAGES.moohtah_shell,
};

const warCrystal: ImbuingScrollItem = {
  key: "war_crystal",
  name: "War Crystal",
  quantity: 5,
  imageUrl: ITEM_IMAGES.war_crystal,
};

const cyclopsToe: ImbuingScrollItem = {
  key: "cyclops_toe",
  name: "Cyclops Toe",
  quantity: 20,
  imageUrl: ITEM_IMAGES.cyclops_toe,
};

const ogreNoseRing: ImbuingScrollItem = {
  key: "ogre_nose_ring",
  name: "Ogre Nose Ring",
  quantity: 15,
  imageUrl: ITEM_IMAGES.ogre_nose_ring,
};

const warmastersWristguards: ImbuingScrollItem = {
  key: "warmasters_wristguards",
  name: "Warmaster's Wristguards",
  quantity: 10,
  imageUrl: ITEM_IMAGES.warmasters_wristguards,
};

const orcTooth: ImbuingScrollItem = {
  key: "orc_tooth",
  name: "Orc Tooth",
  quantity: 20,
  imageUrl: ITEM_IMAGES.orc_tooth,
};

const battleStone: ImbuingScrollItem = {
  key: "battle_stone",
  name: "Battle Stone",
  quantity: 25,
  imageUrl: ITEM_IMAGES.battle_stone,
};

const moohtantHorn: ImbuingScrollItem = {
  key: "moohtant_horn",
  name: "Moohtant Horn",
  quantity: 20,
  imageUrl: ITEM_IMAGES.moohtant_horn,
};

// Scrolls

const epiphanyPowerfulScroll: ImbuingScroll = {
  key: "scroll_epiphany_powerful",
  name: "Epiphany Powerful",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_epiphany_powerful,
  color: "#EF6C00",
  items: [elvishTalisman, brokenShamanicStaff, strandOfMedusaHair],
};

const epiphanyIntricateScroll: ImbuingScroll = {
  key: "scroll_epiphany_intricate",
  name: "Epiphany Intricate",
  craftMethods: ["items"],
  color: "#FB8C00",
  items: [elvishTalisman, brokenShamanicStaff],
  imageUrl: SCROLL_IMAGES.scroll_epiphany_intricate,
  scrollType: "intricate",
};

const precisionScroll: ImbuingScroll = {
  key: "scroll_precise",
  name: "Precision",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_precise,
  color: "#00897B",
  items: [elvenScoutingGlass, elvenHoof, metalSpike],
};

const punchScroll: ImbuingScroll = {
  key: "scroll_punch",
  name: "Punch",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_punch,
  color: "#6D4C41",
  items: [tarantulaEgg, mantassinTail, goldBrocadedCloth],
};

const slashScroll: ImbuingScroll = {
  key: "scroll_slash",
  name: "Slash",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_slash,
  color: "#9E9E9E",
  items: [lionsMane, moohtahShell, warCrystal],
};

const bashScroll: ImbuingScroll = {
  key: "scroll_bash",
  name: "Bash",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_bash,
  color: "#283593",
  items: [cyclopsToe, ogreNoseRing, warmastersWristguards],
};

const chopScroll: ImbuingScroll = {
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
