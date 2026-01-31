import type { HuntSession, HuntSessionForm } from "../schemas";

export function mapHuntSessionToForm(huntSession: HuntSession): HuntSessionForm {
  return {
    ...huntSession,
    place_id: huntSession.place.id,

    killed_monsters:
      huntSession.killed_monsters.map((m) => ({
        name: m.monster.name,
        monsterId: m.monster.id,
        count: m.count,
        preyBonusId: m.prey_bonus?.[0]?.prey.id ?? null,
      })) ?? [],

    looted_items:
      huntSession.looted_items?.map((i) => ({
        name: i.item.name,
        itemId: i.item.id,
        count: i.count,
      })) ?? [],

    supplies:
      huntSession.supplies?.map((s) => ({
        name: s.supply.name,
        supplyId: s.supply.id,
        count: s.count,
      })) ?? [],

    damage_elements:
      huntSession.damage_elements?.map((de) => ({
        damageElementId: de.damage_element.id,
        percent: de.percent,
        name: de.damage_element.name,
      })) ?? [],

    damage_sources:
      huntSession.damage_sources?.map((ds) => ({
        damageSourceId: ds.damage_source.id,
        percent: ds.percent,
        damage_source: {
          name: ds.damage_source.name,
          id: ds.damage_source.id,
          image_path: ds.damage_source.image_path,
        },
      })) ?? [],
  };
}
