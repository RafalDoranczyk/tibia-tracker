import {
  BLANK_SCROLL_PRICE,
  INTRICATE_SCROLL_MAKING_PRICE,
  MARKET_TAX_RATE,
  POWERFULL_SCROLL_MAKING_PRICE,
  TOKENS_NEEDED_FOR_SCROLL,
} from "./constants";
import type { Scroll, ScrollItem, ScrollType } from "./types";

export function getScrollLaborCost(scrollType: ScrollType) {
  return scrollType === "powerfull"
    ? POWERFULL_SCROLL_MAKING_PRICE + BLANK_SCROLL_PRICE
    : INTRICATE_SCROLL_MAKING_PRICE + BLANK_SCROLL_PRICE;
}

export function calculateScrollCostWithTokens({
  scrollType,
  tokenPrice,
}: { scrollType: ScrollType; tokenPrice: number }) {
  const laborCost = getScrollLaborCost(scrollType);
  const tokensCost = calculateItemsCostUsingTokens(tokenPrice);

  return laborCost + tokensCost;
}

export function calculateScrollCostWithItems({
  scrollType,
  itemsPrice,
}: { scrollType: ScrollType; itemsPrice: number }) {
  const laborCost = getScrollLaborCost(scrollType);

  return laborCost + itemsPrice;
}

export function calculateTokenToItemsProfit({
  items,
  itemPrices,
  tokenPrice,
}: {
  items: ScrollItem[];
  itemPrices: Record<number, number>;
  tokenPrice: number;
}) {
  const tokensCost = tokenPrice * 6;

  const itemsGrossValue = items.reduce((total, item) => {
    const price = itemPrices[item.id] ?? 0;
    return total + price * item.quantity;
  }, 0);

  // 3. tax
  const tax = itemsGrossValue * MARKET_TAX_RATE;

  // 4. netto
  const itemsNetValue = itemsGrossValue - tax;

  // 5. profit
  return itemsNetValue - tokensCost;
}

export function calculateProfit({ price, cost }: { price: number; cost: number }) {
  return price * (1 - MARKET_TAX_RATE) - cost;
}

export function calculateItemsCostUsingTokens(tokenPrice: number) {
  return tokenPrice * TOKENS_NEEDED_FOR_SCROLL;
}

export function calculateScrollItemsTotal(items: ScrollItem[], prices: Record<number, number>) {
  return items.reduce((total, item) => total + (prices[item.id] ?? 0) * item.quantity, 0);
}

export function getScrollColorStyles(color: string) {
  return { borderLeft: `6px solid ${color}` };
}

export type ScrollEconomyResult = {
  costWithItems: number;
  costWithTokens: number;
  profitWithItems: number;
  profitWithTokens: number;
  tokenFlipProfit: number;
};

export function calculateScrollEconomy({
  scroll,
  scrollPrice,
  itemPrices,
  tokenPrice,
}: {
  scroll: Scroll;
  scrollPrice: number;
  itemPrices: Record<number, number>;
  tokenPrice: number;
}): ScrollEconomyResult {
  const scrollType = scroll.scrollType ?? "powerfull";

  const itemsPrice = calculateScrollItemsTotal(scroll.items, itemPrices);

  const costWithItems = calculateScrollCostWithItems({
    scrollType,
    itemsPrice,
  });

  const costWithTokens = calculateScrollCostWithTokens({
    scrollType,
    tokenPrice,
  });

  const profitWithItems = calculateProfit({
    price: scrollPrice,
    cost: costWithItems,
  });

  const profitWithTokens = calculateProfit({
    price: scrollPrice,
    cost: costWithTokens,
  });

  const tokenFlipProfit = calculateTokenToItemsProfit({
    items: scroll.items,
    itemPrices,
    tokenPrice,
  });

  return {
    costWithItems,
    costWithTokens,
    profitWithItems,
    profitWithTokens,
    tokenFlipProfit,
  };
}
