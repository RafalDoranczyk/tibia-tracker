import type { CraftMethod } from "../types";

export function canBuyScrollForTokens(craftMethods: CraftMethod[]) {
  return craftMethods.includes("tokens");
}
