import type { ItemPreview } from "@/modules/items";
import { parseHuntSessionJSON } from "../parsers/parseHuntSessionJSON";
import { type HuntSessionForm, HuntSessionLogParsedSchema, type MonsterPreview } from "../schemas";

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
  };

  return {
    formValues,
    unknown: {
      monsters: monsters.unknown,
      items: items.unknown,
    },
  };
}
