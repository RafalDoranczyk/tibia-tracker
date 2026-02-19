import { getCharacterCharmList } from "@/modules/charms/server";
import { getDamageElements } from "@/modules/damage-elements/server";
import { getHuntPlaceList } from "@/modules/hunt-places/server";
import { getItemList, getSupplyList } from "@/modules/items/server";
import { getMonsterList } from "@/modules/monsters/server";
import { getPreyBonuses } from "@/modules/prey-bonus/server";
import { getHuntSession } from "./get-hunt-session";

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
