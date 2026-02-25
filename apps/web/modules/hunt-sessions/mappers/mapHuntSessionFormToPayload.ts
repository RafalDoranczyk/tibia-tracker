import type { CreateHuntSessionPayload, HuntSessionForm } from "../schemas";

type Props = {
  formData: HuntSessionForm;
  characterId: string;
};
export const mapHuntSessionFormToPayload = ({
  formData,
  characterId,
}: Props): CreateHuntSessionPayload => ({
  ...formData,
  character_id: characterId,
  killed_monsters: formData.killed_monsters.map((km) => ({
    monster_id: km.monsterId,
    count: km.count,
    prey_bonus_id: km.preyBonusId,
    charm_bonus_id: km.charmBonusId,
  })),
  looted_items: formData.looted_items.map((li) => ({
    item_id: li.itemId,
    count: li.count,
  })),
  damage_elements: formData.damage_elements.map((de) => ({
    damage_element_id: de.damageElementId,
    percent: de.percent,
  })),
  monster_damage_sources: formData.monster_damage_sources.map((ds) => ({
    monster_id: ds.monsterId,
    percent: ds.percent,
  })),
  supplies: formData.supplies.map((s) => ({
    item_id: s.supplyId,
    count: s.count,
  })),
});
