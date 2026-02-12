import type { ImbuingCraftMethod } from "../schemas";

export function canBuyScrollForTokens(craftMethods: ImbuingCraftMethod[]) {
  return craftMethods.includes("tokens");
}
