import { ITEM_IMAGES, SCROLL_IMAGES } from "../images";
import type { Scroll } from "../types";

const lichShroudScroll: Scroll = {
  name: "Lich Shroud",
  defaultPrice: 950000,
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES["Cloud Fabric"],
  color: "#212121",
  items: [
    {
      id: 10,
      name: "Gloom Wolf Fur",
      quantity: 20,
      defaultPrice: 18000,
      imageUrl: ITEM_IMAGES["Gloom Wolf Fur"],
    },
    {
      id: 11,
      name: "Embalming Fluid",
      quantity: 25,
      defaultPrice: 3000,
      imageUrl: ITEM_IMAGES["Flask of Embalming Fluid"],
    },
    {
      id: 12,
      name: "Mystical Hourglass",
      quantity: 5,
      defaultPrice: 1000,
      imageUrl: ITEM_IMAGES["Mystical Hourglass"],
    },
  ],
};

const snakeSkinScroll: Scroll = {
  name: "Snake Skin",
  defaultPrice: 550000,
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES["Snake Skin"],
  color: "#2E7D32",
  items: [
    {
      id: 13,
      name: "Swampling Wood",
      quantity: 25,
      defaultPrice: 3000,
      imageUrl: ITEM_IMAGES["Piece of Swampling Wood"],
    },
    {
      id: 14,
      name: "Snake Skin",
      quantity: 20,
      defaultPrice: 500,
      imageUrl: ITEM_IMAGES["Snake Skin"],
    },
    {
      id: 15,
      name: "Brimstone Fangs",
      quantity: 10,
      defaultPrice: 9000,
      imageUrl: ITEM_IMAGES["Brimstone Fangs"],
    },
  ],
};

const dragonHideScroll: Scroll = {
  name: "Dragon Hide",
  defaultPrice: 450000,
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES["Dragon Hide"],
  color: "#8E3B1F",
  items: [
    {
      id: 16,
      name: "Green Dragon Leather",
      quantity: 20,
      defaultPrice: 5000,
      imageUrl: ITEM_IMAGES["Green Dragon Leather"],
    },
    {
      id: 17,
      name: "Blazing Bone",
      quantity: 10,
      defaultPrice: 1200,
      imageUrl: ITEM_IMAGES["Blazing Bone"],
    },
    {
      id: 18,
      name: "Draken Sulphur",
      quantity: 5,
      defaultPrice: 1000,
      imageUrl: ITEM_IMAGES["Draken Sulphur"],
    },
  ],
};

const quaraScaleScroll: Scroll = {
  name: "Quara Scale",
  defaultPrice: 490000,
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES["Quara Scale"],
  color: "#4FC3F7",
  items: [
    {
      id: 19,
      name: "Winter Wolf Fur",
      quantity: 25,
      defaultPrice: 4000,
      imageUrl: ITEM_IMAGES["Winter Wolf Fur"],
    },
    {
      id: 20,
      name: "Thick Fur",
      quantity: 15,
      defaultPrice: 2000,
      imageUrl: ITEM_IMAGES["Thick Fur"],
    },
    {
      id: 21,
      name: "Deepling Warts",
      quantity: 10,
      defaultPrice: 400,
      imageUrl: ITEM_IMAGES["Deepling Warts"],
    },
  ],
};

const cloudFabricScroll: Scroll = {
  name: "Cloud Fabric",
  defaultPrice: 560000,
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES["Cloud Fabric"],
  color: "#6A1B9A",
  items: [
    {
      id: 22,
      name: "Wyvern Talisman",
      quantity: 20,
      defaultPrice: 5000,
      imageUrl: ITEM_IMAGES["Wyvern Talisman"],
    },
    {
      id: 23,
      name: "Crawler Head Plating",
      quantity: 15,
      defaultPrice: 4200,
      imageUrl: ITEM_IMAGES["Crawler Head Plating"],
    },
    {
      id: 24,
      name: "Wyrm Scale",
      quantity: 10,
      defaultPrice: 900,
      imageUrl: ITEM_IMAGES["Wyrm Scale"],
    },
  ],
};

const demonicPresenceScroll: Scroll = {
  name: "Demonic Presence",
  defaultPrice: 470000,
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES["Demon Presence"],
  color: "#D4AF37",
  items: [
    {
      id: 25,
      name: "Cultish Robe",
      quantity: 25,
      defaultPrice: 150,
      imageUrl: ITEM_IMAGES["Cultish Robe"],
    },
    {
      id: 26,
      name: "Cultish Mask",
      quantity: 25,
      defaultPrice: 4500,
      imageUrl: ITEM_IMAGES["Cultish Mask"],
    },
    {
      id: 27,
      name: "Hellspawn Tail",
      quantity: 20,
      defaultPrice: 800,
      imageUrl: ITEM_IMAGES["Hellspawn Tail"],
    },
  ],
};

export const elementScrolls = [
  lichShroudScroll,
  snakeSkinScroll,
  dragonHideScroll,
  quaraScaleScroll,
  cloudFabricScroll,
  demonicPresenceScroll,
];
