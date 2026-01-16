import {
  BLANK_SCROLL_PRICE,
  GOLD_TOKENS_NEEDED_FOR_SCROLL,
  INTRICATE_SCROLL_MAKING_PRICE,
  MARKET_TAX_RATE,
  POWERFULL_SCROLL_MAKING_PRICE,
} from "../constants";
import type { ImbuingPrices, Scroll, ScrollItem, ScrollType } from "../types";
import { canBuyScrollForTokens } from "./canBuyScrollForTokens";

function getScrollLaborCost(scrollType: ScrollType) {
  return scrollType === "powerful"
    ? POWERFULL_SCROLL_MAKING_PRICE + BLANK_SCROLL_PRICE
    : INTRICATE_SCROLL_MAKING_PRICE + BLANK_SCROLL_PRICE;
}

function calculateScrollCostWithTokens({
  scrollType,
  tokenPrice,
}: { scrollType: ScrollType; tokenPrice: number }) {
  const laborCost = getScrollLaborCost(scrollType);
  const tokensCost = calculateItemsCostUsingTokens(tokenPrice);

  return laborCost + tokensCost;
}

function calculateScrollCostWithItems({
  scrollType,
  itemsPrice,
}: { scrollType: ScrollType; itemsPrice: number }) {
  const laborCost = getScrollLaborCost(scrollType);

  return laborCost + itemsPrice;
}

function calculateTokenToItemsProfit({
  items,
  itemPrices,
  tokenPrice,
}: {
  items: ScrollItem[];
  itemPrices: ImbuingPrices;
  tokenPrice: number;
}) {
  const tokensCost = tokenPrice * 6;

  const itemsGrossValue = items.reduce((total, item) => {
    const price = itemPrices[item.key] ?? 0;
    return total + price * item.quantity;
  }, 0);

  // 3. tax
  const tax = itemsGrossValue * MARKET_TAX_RATE;

  // 4. netto
  const itemsNetValue = itemsGrossValue - tax;

  // 5. profit
  return itemsNetValue - tokensCost;
}

function calculateProfit({ price, cost }: { price: number; cost: number }) {
  return price * (1 - MARKET_TAX_RATE) - cost;
}

function calculateItemsCostUsingTokens(tokenPrice: number) {
  return tokenPrice * GOLD_TOKENS_NEEDED_FOR_SCROLL;
}

function calculateScrollItemsTotal(items: ScrollItem[], prices: ImbuingPrices) {
  return items.reduce((total, item) => total + (prices[item.key] ?? 0) * item.quantity, 0);
}

export function calculateScrollEconomy({
  scroll,
  scrollPrice,
  itemPrices,
  tokenPrice,
}: {
  scroll: Scroll;
  scrollPrice: number;
  itemPrices: ImbuingPrices;
  tokenPrice: number;
}) {
  const scrollType = scroll.scrollType ?? "powerful";

  const itemsPrice = calculateScrollItemsTotal(scroll.items, itemPrices);

  let costWithTokens = 0;
  let profitWithTokens = 0;
  let tokenFlipProfit = 0;

  const costWithItems = calculateScrollCostWithItems({
    scrollType,
    itemsPrice,
  });

  const profitWithItems = calculateProfit({
    price: scrollPrice,
    cost: costWithItems,
  });

  const supportsTokenCrafting = canBuyScrollForTokens(scroll.craftMethods);

  if (supportsTokenCrafting) {
    costWithTokens = calculateScrollCostWithTokens({
      scrollType,
      tokenPrice,
    });

    profitWithTokens = calculateProfit({
      price: scrollPrice,
      cost: costWithTokens,
    });

    tokenFlipProfit = calculateTokenToItemsProfit({
      items: scroll.items,
      itemPrices,
      tokenPrice,
    });
  }

  return {
    costWithItems,
    profitWithItems,
    profitWithTokens,
    tokenFlipProfit,
    costWithTokens,
  };
}

export type ScrollEconomyResult = ReturnType<typeof calculateScrollEconomy>;
