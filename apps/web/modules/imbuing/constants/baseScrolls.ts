import { ITEM_IMAGES, SCROLL_IMAGES } from "../images";
import type { ImbuingScroll, ImbuingScrollItem } from "../schemas";

// ImbuingScroll Items
const vampireTeeth: ImbuingScrollItem = {
  key: "vampire_teeth",
  name: "Vampire Teeth",
  quantity: 25,
  imageUrl: ITEM_IMAGES.vampire_teeth,
};

const bloodyPincers: ImbuingScrollItem = {
  key: "bloody_pincers",
  name: "Bloody Pincers",
  quantity: 15,
  imageUrl: ITEM_IMAGES.bloody_pincers,
};

const pieceOfDeadBrain: ImbuingScrollItem = {
  key: "piece_of_dead_brain",
  name: "Piece of Dead Brain",
  quantity: 5,
  imageUrl: ITEM_IMAGES.piece_of_dead_brain,
};

const ropeBelt: ImbuingScrollItem = {
  key: "rope_belt",
  name: "Rope Belt",
  quantity: 25,
  imageUrl: ITEM_IMAGES.rope_belt,
};

const silencerClaws: ImbuingScrollItem = {
  key: "silencer_claws",
  name: "Silencer Claws",
  quantity: 25,
  imageUrl: ITEM_IMAGES.silencer_claws,
};

const grimleechWings: ImbuingScrollItem = {
  key: "grimleech_wings",
  name: "Grimleech Wings",
  quantity: 5,
  imageUrl: ITEM_IMAGES.grimleech_wings,
};

const sabretooth: ImbuingScrollItem = {
  key: "sabretooth",
  name: "Sabretooth",
  quantity: 25,
  imageUrl: ITEM_IMAGES.sabretooth,
};

const protectiveCharm: ImbuingScrollItem = {
  key: "protective_charm",
  name: "Protective Charm",
  quantity: 20,
  imageUrl: ITEM_IMAGES.protective_charm,
};

const vexclawTalon: ImbuingScrollItem = {
  key: "vexclaw_talon",
  name: "Vexclaw Talon",
  quantity: 5,
  imageUrl: ITEM_IMAGES.vexclaw_talon,
};

// Scrolls
const vampScroll: ImbuingScroll = {
  key: "scroll_vampirism",
  name: "Vampirism",
  craftMethods: ["items", "tokens"],
  color: "#C62828",
  imageUrl: SCROLL_IMAGES.scroll_vampirism,
  items: [vampireTeeth, bloodyPincers, pieceOfDeadBrain],
};

const voidScroll: ImbuingScroll = {
  key: "scroll_void",
  name: "Void",
  craftMethods: ["items", "tokens"],
  color: "#1565C0",
  imageUrl: SCROLL_IMAGES.scroll_void,
  items: [ropeBelt, silencerClaws, grimleechWings],
};

const strikeScroll: ImbuingScroll = {
  key: "scroll_strike",
  name: "Strike",
  craftMethods: ["items", "tokens"],
  color: "#F9A825",
  imageUrl: SCROLL_IMAGES.scroll_strike,
  items: [sabretooth, protectiveCharm, vexclawTalon],
};

export const baseScrolls = [vampScroll, voidScroll, strikeScroll];
