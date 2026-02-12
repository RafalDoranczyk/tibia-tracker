import { PATHS } from "@/core/paths";

import type { NavigationLinkElementProps } from "../types";

export function resolvePath(
  to: NavigationLinkElementProps["to"],
  characterId?: string | null
): string | null {
  if (typeof to === "function") {
    if (!characterId) return null;
    return to(PATHS.CHARACTER(characterId));
  }

  return to;
}
