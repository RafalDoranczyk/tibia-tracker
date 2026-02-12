import type { ItemPreview } from "@/modules/items";

import { type HuntSessionForm, HuntSessionLogParsedSchema, type MonsterPreview } from "../schemas";
import { parseHuntSessionJSON } from "../utils/parseHuntSessionJSON";

function mapParsedEntitiesToCatalog<
  TParsed extends { name: string; count: number },
  TCatalog extends { id: number; name: string },
>(parsed: TParsed[], catalog: TCatalog[]) {
  const catalogMap = new Map(catalog.map((c) => [c.name.toLowerCase(), c]));

  const mapped = [];
  const unknown = [];

  for (const p of parsed) {
    const match = catalogMap.get(p.name.toLowerCase());

    if (!match) {
      unknown.push(p.name);
      continue;
    }

    mapped.push({
      id: match.id,
      count: p.count,
    });
  }

  return { mapped, unknown };
}

const mapDamageSources = (
  monsters: HuntSessionForm["killed_monsters"]
): HuntSessionForm["monster_damage_sources"] => {
  const percent = Math.round((monsters.length ? 100 / monsters.length : 0) * 10) / 10;

  return monsters.map((m) => ({
    percent,
    monsterId: m.monsterId,
  }));
};

type MapHuntSessionJSONToFormParams = {
  json: string;
  monsterList: MonsterPreview[];
  itemList: ItemPreview[];
};

export function mapHuntSessionJSONToForm({
  json,
  monsterList,
  itemList,
}: MapHuntSessionJSONToFormParams) {
  const parsed = parseHuntSessionJSON(json);
  const parsedPayload = HuntSessionLogParsedSchema.parse(parsed);

  const { killed_monsters, looted_items, ...rest } = parsedPayload;

  const monsters = mapParsedEntitiesToCatalog(killed_monsters, monsterList);
  const items = mapParsedEntitiesToCatalog(looted_items, itemList);

  const monstersForm = monsters.mapped.map((m) => ({
    monsterId: m.id,
    count: m.count,
  }));

  const itemsForm = items.mapped.map((m) => ({
    itemId: m.id,
    count: m.count,
  }));

  const formValues: Partial<HuntSessionForm> = {
    ...rest,
    killed_monsters: monstersForm,
    looted_items: itemsForm,
    monster_damage_sources: mapDamageSources(monstersForm),
  };

  return {
    formValues,
    unknown: {
      monsters: monsters.unknown,
      items: items.unknown,
    },
  };
}
