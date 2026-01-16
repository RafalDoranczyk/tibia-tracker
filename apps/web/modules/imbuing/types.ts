import type { StaticImageData } from "next/image";
import type { z } from "zod";

import type { IMBUING_SCROLL_ITEM_KEYS, IMBUING_SCROLL_KEYS } from "./constants";
import type { FetchImbuItemSchema } from "./schemas";
/* =========================
 * BASIC ENUM-LIKE TYPES
 * ========================= */

// Scroll tier / strength
export type ScrollType = "powerful" | "intricate";

// How a scroll can be crafted
export type CraftMethod = "items" | "tokens";

/* =========================
 * PRICE KEYS
 * ========================= */

// Keys representing craft items or tokens
export type ImbuingScrollItemKey = (typeof IMBUING_SCROLL_ITEM_KEYS)[number];

// Keys representing imbuing scrolls themselves
export type ImbuingScrollKey = (typeof IMBUING_SCROLL_KEYS)[number];

// Any key that can have a price
export type ImbuingPriceKey = ImbuingScrollItemKey | ImbuingScrollKey;

// Price map used by store and API
export type ImbuingPrices = Partial<Record<ImbuingPriceKey, number>>;

/* =========================
 * SCROLL DOMAIN
 * ========================= */

// Single item required to craft a scroll
export type ScrollItem = {
  key: ImbuingPriceKey;
  name: string;
  quantity: number;
  imageUrl: StaticImageData;
};

// Scroll definition used by UI and pricing logic
export type Scroll = {
  key: ImbuingScrollKey;
  name: string;
  items: ScrollItem[];
  craftMethods: CraftMethod[];
  color: string;
  imageUrl: StaticImageData;
  scrollType?: ScrollType;
};

// Validated backend row
export type FetchImbuItem = z.infer<typeof FetchImbuItemSchema>;
