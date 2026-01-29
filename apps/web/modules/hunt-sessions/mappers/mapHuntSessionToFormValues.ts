import type { HuntSession, HuntSessionFormValues } from "../types";

export function mapHuntSessionToFormValues(huntSession: HuntSession): HuntSessionFormValues {
  return {
    ...huntSession,
    place_id: huntSession.place.id,

    monsters:
      huntSession.monsters.map((m) => ({
        name: m.monster.name,
        id: m.monster.id,
        count: m.count,
      })) ?? [],

    items:
      huntSession.items?.map((i) => ({
        name: i.item.name,
        id: i.item.id,
        count: i.count,
      })) ?? [],

    supplies:
      huntSession.supplies?.map((s) => ({
        name: s.supply.name,
        id: s.supply.id,
        count: s.count,
        count_per_hour: s.count_per_hour,
      })) ?? [],

    damage_elements:
      huntSession.damage_elements?.map((de) => ({
        id: de.damage_element.id,
        percent: de.percent,
        name: de.damage_element.name,
      })) ?? [],

    damage_sources:
      huntSession.damage_sources?.map((ds) => ({
        id: ds.damage_source.id,
        percent: ds.percent,
        damage_source: {
          name: ds.damage_source.name,
          id: ds.damage_source.id,
          image_path: ds.damage_source.image_path,
        },
      })) ?? [],
  };
}
