import type { StaticImageData } from "next/image";
import type { z } from "zod";

import type { IMBUING_SCROLL_ITEM_KEYS, IMBUING_SCROLL_KEYS } from "./constants";
import type { ImbuingItemSchema } from "./schemas";

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

export type ScrollType = "powerful" | "intricate";
export type CraftMethod = "items" | "tokens";

export type ImbuingScrollItemKey = (typeof IMBUING_SCROLL_ITEM_KEYS)[number];
export type ImbuingScrollKey = (typeof IMBUING_SCROLL_KEYS)[number];

export type ImbuingPriceKey = ImbuingScrollItemKey | ImbuingScrollKey;
export type ImbuingPrices = Partial<Record<ImbuingPriceKey, number>>;

export type ImbuingItem = z.infer<typeof ImbuingItemSchema>;
