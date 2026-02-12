import { ITEM_IMAGES, SCROLL_IMAGES } from "../images";
import type { ImbuingScroll, ImbuingScrollItem } from "../schemas";

// ImbuingScroll items
const gloomWolfFur: ImbuingScrollItem = {
  key: "gloom_wolf_fur",
  name: "Gloom Wolf Fur",
  quantity: 20,
  imageUrl: ITEM_IMAGES.gloom_wolf_fur,
};

const flaskOfEmbalmingFluid: ImbuingScrollItem = {
  key: "flask_of_embalming_fluid",
  name: "Flask of Embalming Fluid",
  quantity: 25,
  imageUrl: ITEM_IMAGES.flask_of_embalming_fluid,
};

const mysticalHourglass: ImbuingScrollItem = {
  key: "mystical_hourglass",
  name: "Mystical Hourglass",
  quantity: 5,
  imageUrl: ITEM_IMAGES.mystical_hourglass,
};

const pieceOfSwamplingWood: ImbuingScrollItem = {
  key: "piece_of_swampling_wood",
  name: "Piece of Swampling Wood",
  quantity: 25,
  imageUrl: ITEM_IMAGES.piece_of_swampling_wood,
};

const snakeSkin: ImbuingScrollItem = {
  key: "snake_skin",
  name: "Snake Skin",
  quantity: 20,
  imageUrl: ITEM_IMAGES.snake_skin,
};

const brimstoneFangs: ImbuingScrollItem = {
  key: "brimstone_fangs",
  name: "Brimstone Fangs",
  quantity: 10,
  imageUrl: ITEM_IMAGES.brimstone_fangs,
};

const greenDragonLeather: ImbuingScrollItem = {
  key: "green_dragon_leather",
  name: "Green Dragon Leather",
  quantity: 20,
  imageUrl: ITEM_IMAGES.green_dragon_leather,
};

const blazingBone: ImbuingScrollItem = {
  key: "blazing_bone",
  name: "Blazing Bone",
  quantity: 10,
  imageUrl: ITEM_IMAGES.blazing_bone,
};

const drakenSulphur: ImbuingScrollItem = {
  key: "draken_sulphur",
  name: "Draken Sulphur",
  quantity: 5,
  imageUrl: ITEM_IMAGES.draken_sulphur,
};

const winterWolfFur: ImbuingScrollItem = {
  key: "winter_wolf_fur",
  name: "Winter Wolf Fur",
  quantity: 25,
  imageUrl: ITEM_IMAGES.winter_wolf_fur,
};

const thickFur: ImbuingScrollItem = {
  key: "thick_fur",
  name: "Thick Fur",
  quantity: 15,
  imageUrl: ITEM_IMAGES.thick_fur,
};

const deeplingWarts: ImbuingScrollItem = {
  key: "deepling_warts",
  name: "Deepling Warts",
  quantity: 10,
  imageUrl: ITEM_IMAGES.deepling_warts,
};

const wyvernTalisman: ImbuingScrollItem = {
  key: "wyvern_talisman",
  name: "Wyvern Talisman",
  quantity: 20,
  imageUrl: ITEM_IMAGES.wyvern_talisman,
};

const crawlerHeadPlating: ImbuingScrollItem = {
  key: "crawler_head_plating",
  name: "Crawler Head Plating",
  quantity: 15,
  imageUrl: ITEM_IMAGES.crawler_head_plating,
};

const wyrmScale: ImbuingScrollItem = {
  key: "wyrm_scale",
  name: "Wyrm Scale",
  quantity: 10,
  imageUrl: ITEM_IMAGES.wyrm_scale,
};

const cultishRobe: ImbuingScrollItem = {
  key: "cultish_robe",
  name: "Cultish Robe",
  quantity: 25,
  imageUrl: ITEM_IMAGES.cultish_robe,
};

const cultishMask: ImbuingScrollItem = {
  key: "cultish_mask",
  name: "Cultish Mask",
  quantity: 25,
  imageUrl: ITEM_IMAGES.cultish_mask,
};

const hellspawnTail: ImbuingScrollItem = {
  key: "hellspawn_tail",
  name: "Hellspawn Tail",
  quantity: 20,
  imageUrl: ITEM_IMAGES.hellspawn_tail,
};

// Scrolls
const lichShroudScroll: ImbuingScroll = {
  key: "scroll_lich_shroud",
  name: "Lich Shroud",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_lich_shroud,
  color: "#212121",
  items: [flaskOfEmbalmingFluid, gloomWolfFur, mysticalHourglass],
};

const snakeSkinScroll: ImbuingScroll = {
  key: "scroll_snake_skin",
  name: "Snake Skin",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_snake_skin,
  color: "#2E7D32",
  items: [pieceOfSwamplingWood, brimstoneFangs, snakeSkin],
};

const dragonHideScroll: ImbuingScroll = {
  key: "scroll_dragon_hide",
  name: "Dragon Hide",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_dragon_hide,
  color: "#8E3B1F",
  items: [greenDragonLeather, blazingBone, drakenSulphur],
};

const quaraScaleScroll: ImbuingScroll = {
  key: "scroll_quara_scale",
  name: "Quara Scale",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_quara_scale,
  color: "#4FC3F7",
  items: [winterWolfFur, thickFur, deeplingWarts],
};

const cloudFabricScroll: ImbuingScroll = {
  key: "scroll_cloud_fabric",
  name: "Cloud Fabric",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_cloud_fabric,
  color: "#6A1B9A",
  items: [wyvernTalisman, crawlerHeadPlating, wyrmScale],
};

const demonicPresenceScroll: ImbuingScroll = {
  key: "scroll_demon_presence",
  name: "Demon Presence",
  craftMethods: ["items"],
  imageUrl: SCROLL_IMAGES.scroll_demon_presence,
  color: "#D4AF37",
  items: [cultishRobe, cultishMask, hellspawnTail],
};

export const elementalScrolls = [
  lichShroudScroll,
  snakeSkinScroll,
  dragonHideScroll,
  quaraScaleScroll,
  cloudFabricScroll,
  demonicPresenceScroll,
];
