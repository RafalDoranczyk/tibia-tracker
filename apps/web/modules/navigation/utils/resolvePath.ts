import { type CharacterPaths, characterPaths } from "@/core/paths";

export function resolvePath(
  to: string | ((p: CharacterPaths) => string),
  activeCharacterId: string | null
): string | null {
  if (typeof to === "string") return to;

  if (!activeCharacterId) return null;

  const paths = characterPaths(activeCharacterId);
  return to(paths);
}
