import { ITEM_IMAGES, SCROLL_IMAGES } from "../images";
import type { Scroll } from "../types";
import { epiphanyScrollItems } from "./shared";

const epiphanyPowerfulScroll: Scroll = {
  name: "Epiphany Powerful",
  defaultPrice: 660000,
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.Epiphany,
  color: "#EF6C00",
  items: [
    ...epiphanyScrollItems,
    {
      id: 30,
      name: "Strand of Medusa Hair",
      quantity: 15,
      defaultPrice: 1000,
      imageUrl: ITEM_IMAGES["Strand of Medusa Hair"],
    },
  ],
};

const epiphanyIntricateScroll: Scroll = {
  name: "Epiphany Intricate",
  defaultPrice: 410000,
  craftMethods: ["items"],
  color: "#FB8C00",
  items: epiphanyScrollItems,
  imageUrl: SCROLL_IMAGES.Epiphany,
  scrollType: "intricate",
};

const precisionScroll: Scroll = {
  name: "Precision",
  defaultPrice: 540000,
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.Precise,
  color: "#00897B",
  items: [
    {
      id: 33,
      name: "Elven Scouting Glass",
      quantity: 25,
      imageUrl: ITEM_IMAGES["Elven Scouting Glass"],
      defaultPrice: 900,
    },
    {
      id: 34,
      name: "Elven Hoof",
      quantity: 20,
      imageUrl: ITEM_IMAGES["Elven Hoof"],
      defaultPrice: 7000,
    },
    {
      id: 35,
      name: "Metal Spike",
      quantity: 15,
      imageUrl: ITEM_IMAGES["Metal Spike"],
      defaultPrice: 500,
    },
  ],
};

const punchScroll: Scroll = {
  name: "Punch",
  defaultPrice: 545000,
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.Punch,
  color: "#6D4C41",
  items: [
    {
      id: 36,
      name: "Tarantula Egg",
      quantity: 25,
      imageUrl: ITEM_IMAGES["Tarantula Egg"],
      defaultPrice: 500,
    },
    {
      id: 37,
      name: "Mantassin Tail",
      quantity: 20,
      imageUrl: ITEM_IMAGES["Mantassin Tail"],
      defaultPrice: 2000,
    },
    {
      id: 38,
      name: "Gold-Brocaded Cloth",
      quantity: 15,
      imageUrl: ITEM_IMAGES["Gold-Brocaded Cloth"],
      defaultPrice: 3500,
    },
  ],
};

const slashScroll: Scroll = {
  name: "Slash",
  defaultPrice: 400000,
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.Slash,
  color: "#9E9E9E",
  items: [
    {
      id: 39,
      name: "Lion's Mane",
      quantity: 25,
      imageUrl: ITEM_IMAGES["Lion's Mane"],
      defaultPrice: 120,
    },
    {
      id: 40,
      name: "Moohtah Shell",
      quantity: 25,
      imageUrl: ITEM_IMAGES["Moohtah Shell"],
      defaultPrice: 2500,
    },
    {
      id: 41,
      name: "War Crystal",
      quantity: 5,
      imageUrl: ITEM_IMAGES["War Crystal"],
      defaultPrice: 1000,
    },
  ],
};

const bashScroll: Scroll = {
  name: "Bash",
  defaultPrice: 360000,
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.Bash,
  color: "#283593",
  items: [
    {
      id: 42,
      name: "Cyclops Toe",
      quantity: 20,
      imageUrl: ITEM_IMAGES["Cyclops Toe"],
      defaultPrice: 200,
    },
    {
      id: 43,
      name: "Ogre Nose Ring",
      quantity: 15,
      imageUrl: ITEM_IMAGES["Ogre Nose Ring"],
      defaultPrice: 300,
    },
    {
      id: 44,
      name: "Warmaster's Wristguards",
      quantity: 10,
      imageUrl: ITEM_IMAGES["Warmaster's Wristguards"],
      defaultPrice: 700,
    },
  ],
};

const chopScroll: Scroll = {
  name: "Chop",
  defaultPrice: 550000,
  craftMethods: ["items"],
  color: "#827717",
  imageUrl: SCROLL_IMAGES.Chop,
  items: [
    {
      id: 45,
      name: "Orc Tooth",
      quantity: 20,
      imageUrl: ITEM_IMAGES["Orc Tooth"],
      defaultPrice: 450,
    },
    {
      id: 46,
      name: "Battle Stone",
      quantity: 25,
      imageUrl: ITEM_IMAGES["Battle Stone"],
      defaultPrice: 350,
    },
    {
      id: 47,
      name: "Moohtant Horn",
      quantity: 20,
      imageUrl: ITEM_IMAGES["Moohtant Horn"],
      defaultPrice: 8700,
    },
  ],
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
