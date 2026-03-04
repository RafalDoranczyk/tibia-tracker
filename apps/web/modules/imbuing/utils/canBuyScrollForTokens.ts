import type { ImbuingCraftMethod } from "../types";

export function canBuyScrollForTokens(craftMethods: ImbuingCraftMethod[]) {
  return craftMethods.includes("tokens");
}
