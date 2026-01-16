import { create } from "zustand";

import { DEFAULT_GOLD_TOKEN_PRICE } from "./constants";
import type { FetchImbuItem, ImbuingPriceKey, ImbuingPrices } from "./types";
import { hasPriceChanges } from "./utils/hasPriceChanges";
import { mapImbuingItemPricesFromDb } from "./utils/mapImbuingItemPricesFromDb";

type ImbuingPriceStore = {
  prices: ImbuingPrices;
  savedPrices: ImbuingPrices;
  isInitialized: boolean;
  hasChanges: boolean;

  initialize: (prices: FetchImbuItem[]) => void;
  setPrice: (key: ImbuingPriceKey, price: number) => void;
  markSaved: () => void;
  reset: () => void;
};

export const useImbuingPriceStore = create<ImbuingPriceStore>((set, get) => ({
  prices: { gold_token: DEFAULT_GOLD_TOKEN_PRICE },
  savedPrices: {},
  isInitialized: false,
  hasChanges: false,

  initialize: (prices) => {
    if (get().isInitialized) return;
    const mappedPrices = mapImbuingItemPricesFromDb(prices);

    set({
      prices: { ...mappedPrices },
      savedPrices: { ...mappedPrices },
      isInitialized: true,
      hasChanges: false,
    });
  },

  setPrice: (key, price) => {
    if (!Number.isFinite(price) || price < 0) return;

    set((state) => {
      const prices = {
        ...state.prices,
        [key]: price,
      };

      return {
        prices,
        hasChanges: hasPriceChanges(prices, state.savedPrices),
      };
    });
  },

  markSaved: () => {
    set((state) => ({
      savedPrices: { ...state.prices },
      hasChanges: false,
    }));
  },

  reset: () => {
    set({
      prices: {},
      savedPrices: {},
      isInitialized: false,
      hasChanges: false,
    });
  },
}));
