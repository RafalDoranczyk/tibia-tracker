import type { CharacterCharm } from "@repo/database";
import type { CharacterCharmWithProgress, CharmViewModel } from "../types";

export function mapCharmWithProgress(
  charms: CharmViewModel[],
  characterCharms: CharacterCharm[]
): CharacterCharmWithProgress[] {
  const byCharmId = new Map(characterCharms.map((cc) => [cc.charm_id, cc]));

  return charms
    .map((charm) => {
      const row = byCharmId.get(charm.id);

      return {
        ...charm,
        progress: {
          unlocked: Boolean(row),
          level: (row?.level ?? 0) as CharacterCharm["level"],
        },
      };
    })
    .sort((a, b) => Number(b.progress.unlocked) - Number(a.progress.unlocked));
}
