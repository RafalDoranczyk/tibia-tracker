import { z } from "zod";

import { MonsterSchema } from "@/modules/bestiary";
import { PositiveInt } from "@/schemas";

import { HuntSessionDbBaseFieldsSchema } from "./db.schema";

// This schema is used to parse hunt session from json file that user can upload
export const HuntSessionLogParsedSchema = HuntSessionDbBaseFieldsSchema.omit({
  id: true,
  character_id: true,
  place_id: true,
  level: true,
  player_count: true,
}).extend({
  killed_monsters: z
    .object({
      count: PositiveInt,
      name: MonsterSchema.shape.name,
    })
    .array(),
  looted_items: z
    .object({
      count: PositiveInt,
      name: MonsterSchema.shape.name,
    })
    .array(),
});

export type HuntSessionRawParsed = z.infer<typeof HuntSessionLogParsedSchema>;
