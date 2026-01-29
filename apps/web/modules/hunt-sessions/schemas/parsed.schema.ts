import { zodOmitKeys } from "@/utils";

import { HuntSessionDbFieldsComputedSchema, HuntSessionDbFieldsSchema } from "./db.schema";
import { LootedItemCountSchema, MonsterCountSchema } from "./relations.schema";

export const HuntSessionRawParsedSchema = HuntSessionDbFieldsSchema.omit({
  id: true,
  character_id: true,
  place_id: true,
  level: true,
  player_count: true,

  // server-managed
  created_at: true,

  // computed on backend
  ...zodOmitKeys(HuntSessionDbFieldsComputedSchema),
}).extend({
  monsters: MonsterCountSchema.omit({ id: true }).array(),
  items: LootedItemCountSchema.omit({ id: true }).array(),
});
