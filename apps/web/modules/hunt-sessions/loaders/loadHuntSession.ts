import { fetchMonsterList } from "@/modules/bestiary/server";
import { fetchCharacterCharms } from "@/modules/charms/server";
import { fetchHuntPlaces } from "@/modules/hunt-places/server";
import { getItemList, getSupplyList } from "@/modules/items/server";

import { fetchHuntSession } from "../actions";
import { loadDamageElements } from "./loadDamageElements";
import { loadPreyBonuses } from "./loadPreyBonuses";

type LoadHuntSessionProps = {
  characterId: string;
  huntSessionId?: number;
};

export async function loadHuntSession({ characterId, huntSessionId }: LoadHuntSessionProps) {
  const huntSessionPromise = huntSessionId
    ? fetchHuntSession({ id: huntSessionId, character_id: characterId })
    : null;

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
    getItemList(),
    fetchMonsterList(),
    fetchHuntPlaces(),
    getSupplyList(),
    loadDamageElements(),
    loadPreyBonuses(),
    fetchCharacterCharms(characterId),
    huntSessionPromise,
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
