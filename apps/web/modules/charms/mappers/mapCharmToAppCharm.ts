import type { Charm, CharmViewModel } from "../schemas";

export function mapCharmToAppCharm(row: Charm): CharmViewModel {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    description: row.description,
    image_path: row.image_path,
    levels: {
      1: { cost: row.cost_lvl1, effect: row.effect_lvl1 },
      2: { cost: row.cost_lvl2, effect: row.effect_lvl2 },
      3: { cost: row.cost_lvl3, effect: row.effect_lvl3 },
    },
  };
}
