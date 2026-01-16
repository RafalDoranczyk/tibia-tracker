import type { Scroll } from "../types";

export function canBuyScrollForTokens(craftMethods: Scroll["craftMethods"]) {
  return craftMethods.includes("tokens");
}
