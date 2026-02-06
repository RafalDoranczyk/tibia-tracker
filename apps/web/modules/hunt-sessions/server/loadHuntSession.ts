"use server";

import { fetchCharacterCharms } from "@/modules/charms/actions/fetchCharacterCharms";
import { fetchHuntPlaces } from "@/modules/hunt-places";
import { fetchItems } from "@/modules/items";

import { fetchDamageElements } from "../actions/fetchDamageElements";
import { fetchHuntSession } from "../actions/fetchHuntSession";
import { fetchMonstersPreview } from "../actions/fetchMonstersPreview";
import { fetchPreyBonuses } from "../actions/fetchPreyBonuses";
import { fetchSupplies } from "../actions/fetchSupplies";

type LoadHuntSessionProps = {
  characterId: string;
  huntSessionId?: number;
};
export async function loadHuntSession({ characterId, huntSessionId }: LoadHuntSessionProps) {
  const [
    itemList,
    monsterList,
    huntPlaceList,
    supplyList,
    damageElementList,
    preyBonusList,
    characterCharmList,
    huntSession,
  ] = await Promise.all([
    fetchItems(),
    fetchMonstersPreview(),
    fetchHuntPlaces(),
    fetchSupplies(),
    fetchDamageElements(),
    fetchPreyBonuses(),
    fetchCharacterCharms(characterId),
    huntSessionId ? fetchHuntSession({ id: huntSessionId, character_id: characterId }) : null,
  ]);

  return {
    itemList,
    monsterList,
    huntPlaceList,
    supplyList,
    damageElementList,
    preyBonusList,
    characterCharmList,
    huntSession,
  };
}
