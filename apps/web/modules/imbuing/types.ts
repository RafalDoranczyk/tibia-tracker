import type { ImbuingPriceKey } from "@repo/database/imbuing-prices";
import type { StaticImageData } from "next/image";

export type ImbuingScrollType = "powerful" | "intricate";
export type ImbuingCraftMethod = "items" | "tokens";

export interface ImbuingScrollItem {
  key: ImbuingPriceKey;
  name: string;
  quantity: number;
  imageUrl: StaticImageData;
}

export interface ImbuingScroll {
  key: ImbuingPriceKey;
  name: string;
  items: ImbuingScrollItem[];
  craftMethods: ImbuingCraftMethod[];
  color: string;
  imageUrl: StaticImageData;
  scrollType?: ImbuingScrollType;
}

export type ImbuingPrices = Record<ImbuingPriceKey, number>;
