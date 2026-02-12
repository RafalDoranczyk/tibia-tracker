"use server";

import { fetchCharacterCharms } from "@/modules/charms";
import { loadHuntPlaces } from "@/modules/hunt-places";
import { loadItems, loadSupplies } from "@/modules/items";

import { fetchHuntSession } from "../actions";
import { loadDamageElements } from "./loadDamageElements";
import { loadMonstersPreview } from "./loadMonstersPreview";
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
    loadItems(),
    loadMonstersPreview(),
    loadHuntPlaces(),
    loadSupplies(),
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
