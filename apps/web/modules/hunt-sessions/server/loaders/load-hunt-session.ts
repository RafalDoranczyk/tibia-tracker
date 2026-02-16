import { getCharacterCharmList } from "@/modules/charms/server";
import { getHuntPlaceList } from "@/modules/hunt-places/server";
import { getItemList, getSupplyList } from "@/modules/items/server";

import { getDamageElements } from "./get-damage-elements";
import { getHuntSession } from "./get-hunt-session";
import { getMonsterList } from "./get-monster-list";
import { getPreyBonuses } from "./get-prey-bonuses";

type LoadHuntSessionProps = {
  characterId: string;
  huntSessionId?: number;
};

export async function loadHuntSession({ characterId, huntSessionId }: LoadHuntSessionProps) {
  const huntSessionPromise = huntSessionId
    ? getHuntSession({ id: huntSessionId, character_id: characterId })
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
    getMonsterList(),
    getHuntPlaceList(),
    getSupplyList(),
    getDamageElements(),
    getPreyBonuses(),
    getCharacterCharmList(characterId),
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
