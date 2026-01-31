import type { CharacterCharmRowWithCharm, Charm, CharmWithProgress } from "../schemas";

export function mapCharmsWithProgress(
  charms: Charm[],
  characterCharms: CharacterCharmRowWithCharm[]
): CharmWithProgress[] {
  const byCharmId = new Map(characterCharms.map((cc) => [cc.charm_id, cc]));

  return charms
    .map((charm) => {
      const row = byCharmId.get(charm.id);

      return {
        ...charm,
        progress: {
          unlocked: Boolean(row),
          level: row?.level ?? 0,
          unlocked_at: row?.unlocked_at ?? null,
        },
      };
    })
    .sort((a, b) => Number(b.progress.unlocked) - Number(a.progress.unlocked));
}
