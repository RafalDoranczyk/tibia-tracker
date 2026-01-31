import type { CreateHuntSessionPayload, HuntSessionForm } from "../schemas";

export const mapHuntSessionFormToPayload = (
  form: HuntSessionForm
): Omit<CreateHuntSessionPayload, "character_id"> => ({
  ...form,
  killed_monsters: form.killed_monsters.map((km) => ({
    monster_id: km.monsterId,
    count: km.count,
    prey_bonus_id: km.preyBonusId,
  })),
  looted_items: form.looted_items.map((li) => ({
    item_id: li.itemId,
    count: li.count,
  })),
  damage_elements: form.damage_elements.map((de) => ({
    damage_element_id: de.damageElementId,
    percent: de.percent,
  })),
  damage_sources: form.damage_sources.map((ds) => ({
    damage_source_id: ds.damageSourceId,
    percent: ds.percent,
  })),
  supplies: form.supplies.map((s) => ({
    supply_id: s.supplyId,
    count: s.count,
  })),
});
