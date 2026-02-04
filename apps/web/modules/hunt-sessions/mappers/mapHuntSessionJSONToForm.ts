import {
  type HuntSessionForm,
  HuntSessionLogParsedSchema,
  type ItemPreview,
  type MonsterPreview,
} from "../schemas";
import { parseHuntSessionJSON } from "../utils/parseHuntSessionJSON";
import { mapParsedEntitiesToCatalog } from "./mapParsedSessionToCatalog";

const mapDamageSources = (
  monsters: HuntSessionForm["killed_monsters"]
): HuntSessionForm["damage_sources"] => {
  const percent = Math.round((monsters.length ? 100 / monsters.length : 0) * 10) / 10;

  return monsters.map((m) => ({
    percent,
    damageSourceId: m.monsterId,
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
    damage_sources: mapDamageSources(monstersForm),
  };

  return {
    formValues,
    unknown: {
      monsters: monsters.unknown,
      items: items.unknown,
    },
  };
}
