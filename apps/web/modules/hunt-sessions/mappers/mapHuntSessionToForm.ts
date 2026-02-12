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
        charmBonusId: m.charm_bonus?.[0]?.charm.id ?? null,
      })) ?? [],

    looted_items:
      huntSession.looted_items?.map((i) => ({
        name: i.item.name,
        itemId: i.item.id,
        count: i.count,
      })) ?? [],

    supplies:
      huntSession.supplies?.map((s) => ({
        name: s.item.name,
        supplyId: s.item.id,
        count: s.count,
      })) ?? [],

    damage_elements:
      huntSession.damage_elements?.map((de) => ({
        damageElementId: de.damage_element.id,
        percent: de.percent,
        name: de.damage_element.name,
      })) ?? [],

    monster_damage_sources:
      huntSession.monster_damage_sources?.map((ds) => ({
        monsterId: ds.damage_source.id,
        percent: ds.percent,
        damage_source: {
          name: ds.damage_source.name,
          id: ds.damage_source.id,
          image_path: ds.damage_source.image_path,
        },
      })) ?? [],
  };
}
