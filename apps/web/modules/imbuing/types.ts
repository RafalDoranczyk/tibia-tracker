import type { StaticImageData } from "next/image";
import type { z } from "zod";

import type { IMBUING_SCROLL_ITEM_KEYS, IMBUING_SCROLL_KEYS } from "./constants";
import type { ImbuingFormSchema, ImbuingItemSchema } from "./schemas";

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

export type ImbuingPriceKey = ImbuingScrollItemKey | ImbuingScrollKey;
export type ImbuingPrices = Record<ImbuingPriceKey, number>;

export type ImbuingItem = z.infer<typeof ImbuingItemSchema>;
export type ImbuingFormValues = z.infer<typeof ImbuingFormSchema>;
