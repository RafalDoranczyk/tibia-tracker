import type { StaticImageData } from "next/image";

import type { IMBUING_SCROLL_ITEM_KEYS, IMBUING_SCROLL_KEYS } from "./constants";
import type { ImbuingPriceKey } from "./schemas";

export type ScrollType = "powerful" | "intricate";
export type CraftMethod = "items" | "tokens";

export type Scroll = {
  key: ImbuingScrollKey;
  name: string;
  items: ScrollItem[];
  craftMethods: CraftMethod[];
  color: string;
  imageUrl: StaticImageData;
  scrollType?: ScrollType;
};

export type ScrollItem = {
  key: ImbuingPriceKey;
  name: string;
  quantity: number;
  imageUrl: StaticImageData;
};

export type ImbuingScrollItemKey = (typeof IMBUING_SCROLL_ITEM_KEYS)[number];
export type ImbuingScrollKey = (typeof IMBUING_SCROLL_KEYS)[number];

export type ImbuingPrices = Record<ImbuingPriceKey, number>;
