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
  stats: formData.stats.map((s) => ({
    stat_definition_id: s.statDefinitionId,
    damage_element_id: s.damageElementId,
    value: s.value,
  })),
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
  damage_sources: formData.damage_sources.map((ds) => ({
    monster_id: ds.damageSourceId,
    percent: ds.percent,
  })),
  supplies: formData.supplies.map((s) => ({
    item_id: s.supplyId,
    count: s.count,
  })),
});
