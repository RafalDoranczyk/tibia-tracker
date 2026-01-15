import { ITEM_IMAGES, SCROLL_IMAGES } from "../images";
import type { Scroll } from "../types";

const vampScroll: Scroll = {
  name: "Vamp",
  defaultPrice: 619000,
  craftMethods: ["items", "tokens"],
  color: "#C62828",
  imageUrl: SCROLL_IMAGES.Vampirism,
  items: [
    {
      id: 1,
      name: "Vampire Teeth",
      quantity: 25,
      defaultPrice: 1000,
      imageUrl: ITEM_IMAGES["Vampire Teeth"],
    },
    {
      id: 2,
      name: "Bloody Pincers",
      quantity: 15,
      defaultPrice: 15500,
      imageUrl: ITEM_IMAGES["Bloody Pincers"],
    },
    {
      id: 3,
      name: "Piece of Dead Brain",
      quantity: 5,
      defaultPrice: 24000,
      imageUrl: ITEM_IMAGES["Piece of Dead Brain"],
    },
  ],
};

const voidScroll: Scroll = {
  name: "Void",
  defaultPrice: 555000,
  craftMethods: ["items", "tokens"],
  color: "#1565C0",
  imageUrl: SCROLL_IMAGES.Void,
  items: [
    {
      id: 7,
      name: "Rope Belt",
      quantity: 25,
      defaultPrice: 5200,
      imageUrl: ITEM_IMAGES["Rope Belt"],
    },
    {
      id: 8,
      name: "Silencer Claws",
      quantity: 25,
      defaultPrice: 4700,
      imageUrl: ITEM_IMAGES["Silencer Claws"],
    },
    {
      id: 9,
      name: "Grimleech Wings",
      quantity: 5,
      defaultPrice: 2300,
      imageUrl: ITEM_IMAGES["Grimleech Wings"],
    },
  ],
};

const strikeScroll: Scroll = {
  name: "Strike",
  defaultPrice: 549000,
  craftMethods: ["items", "tokens"],
  color: "#F9A825",
  imageUrl: SCROLL_IMAGES.Strike,
  items: [
    {
      id: 4,
      name: "Sabretooth",
      quantity: 25,
      defaultPrice: 7300,
      imageUrl: ITEM_IMAGES.Sabretooth,
    },
    {
      id: 5,
      name: "Protective Charm",
      quantity: 20,
      defaultPrice: 3500,
      imageUrl: ITEM_IMAGES["Protective Charm"],
    },
    {
      id: 6,
      name: "Vexclaw Talon",
      quantity: 5,
      defaultPrice: 1300,
      imageUrl: ITEM_IMAGES["Vexclaw Talon"],
    },
  ],
};

export const baseScrolls = [vampScroll, voidScroll, strikeScroll];
