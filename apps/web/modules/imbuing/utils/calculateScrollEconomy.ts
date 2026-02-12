import { IMBUING_CONFIG } from "../constants";
import type {
  ImbuingFormValues,
  ImbuingScroll,
  ImbuingScrollItem,
  ImbuingScrollType,
} from "../schemas";
import { canBuyScrollForTokens } from "./canBuyScrollForTokens";

function getScrollLaborCost(scrollType: ImbuingScrollType) {
  return scrollType === "powerful"
    ? IMBUING_CONFIG.prices.powerful_making + IMBUING_CONFIG.prices.blank_scroll
    : IMBUING_CONFIG.prices.intricate_making + IMBUING_CONFIG.prices.blank_scroll;
}

function calculateScrollCostWithTokens({
  scrollType,
  tokenPrice,
}: {
  scrollType: ImbuingScrollType;
  tokenPrice: number;
}) {
  const laborCost = getScrollLaborCost(scrollType);
  const tokensCost = calculateItemsCostUsingTokens(tokenPrice);

  return laborCost + tokensCost;
}

function calculateScrollCostWithItems({
  scrollType,
  itemsTotalCost,
}: {
  scrollType: ImbuingScrollType;
  itemsTotalCost: number;
}) {
  const laborCost = getScrollLaborCost(scrollType);

  return laborCost + itemsTotalCost;
}

function calculateTokenToItemsProfit({
  items,
  itemPrices,
  tokenPrice,
}: {
  items: ImbuingScrollItem[];
  itemPrices: ImbuingFormValues;
  tokenPrice: number;
}) {
  // 1. cost of tokens
  const tokensCost = tokenPrice * IMBUING_CONFIG.mechanics.gold_tokens_needed;

  // 2. gross value of items
  const itemsGrossValue = items.reduce((total, item) => {
    const price = itemPrices[item.key] ?? 0;
    return total + price * item.quantity;
  }, 0);

  // 3. tax
  const tax = itemsGrossValue * IMBUING_CONFIG.mechanics.market_tax_rate;

  // 4. netto
  const itemsNetValue = itemsGrossValue - tax;

  // 5. profit
  return itemsNetValue - tokensCost;
}

function calculateProfit({ price, cost }: { price: number; cost: number }) {
  // price = market price, tax applied on sale
  return price * (1 - IMBUING_CONFIG.mechanics.market_tax_rate) - cost;
}

function calculateItemsCostUsingTokens(tokenPrice: number) {
  return tokenPrice * IMBUING_CONFIG.mechanics.gold_tokens_needed;
}

function calculateScrollItemsTotal(items: ImbuingScrollItem[], prices: ImbuingFormValues) {
  return items.reduce((total, item) => total + (prices[item.key] ?? 0) * item.quantity, 0);
}

export function calculateScrollEconomy({
  scroll,
  scrollPrice,
  itemPrices,
  tokenPrice,
}: {
  scroll: ImbuingScroll;
  scrollPrice: number;
  itemPrices: ImbuingFormValues;
  tokenPrice: number;
}) {
  const scrollType = scroll.scrollType ?? "powerful";

  const itemsTotalCost = calculateScrollItemsTotal(scroll.items, itemPrices);

  let costWithTokens = 0;
  let profitWithTokens = 0;
  let tokenFlipProfit = 0;

  const costWithItems = calculateScrollCostWithItems({
    scrollType,
    itemsTotalCost,
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
