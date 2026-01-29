import type { MonsterPreview } from "../types";

export function monstersToDamageSources(monsters: MonsterPreview[]) {
  const percent = Math.round((monsters.length ? 100 / monsters.length : 0) * 10) / 10;

  return monsters.map((m) => ({
    id: m.id,
    percent,
    damage_source: {
      id: m.id,
      name: m.name,
      image_path: m.image_path,
    },
  }));
}
