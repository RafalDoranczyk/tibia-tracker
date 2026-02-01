import { PATHS } from "@/paths";

import type { NavigationLinkElementProps } from "../types";

export function resolvePath(
  to: NavigationLinkElementProps["to"],
  characterId?: string | null
): string {
  if (typeof to === "function") {
    if (!characterId) return PATHS.CHARACTERS;
    return to(PATHS.CHARACTER(characterId));
  }

  return to;
}
