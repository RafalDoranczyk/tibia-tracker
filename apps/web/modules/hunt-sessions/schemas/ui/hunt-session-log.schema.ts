import { z } from "zod";

import { LocalDatetime, NonEmptyString, PositiveInt } from "@/lib/zod";

// This schema is used to parse hunt session from json file that user can upload
// I don't want to extend/omit from the DB Schema cause it's hard to maintain
export const HuntSessionLogParsedSchema = z.object({
  date: LocalDatetime,
  started_at: LocalDatetime,
  ended_at: LocalDatetime,
  duration_seconds: PositiveInt,
  profit: z.number(),
  loot_value: PositiveInt,
  supplies_cost: PositiveInt,
  damage: PositiveInt,
  healing: PositiveInt,
  raw_xp_gain: PositiveInt,
  xp_gain: PositiveInt,

  killed_monsters: z.array(
    z.object({
      name: NonEmptyString,
      count: PositiveInt,
    })
  ),

  looted_items: z.array(
    z.object({
      name: NonEmptyString,
      count: PositiveInt,
    })
  ),
});

export type HuntSessionRawParsed = z.infer<typeof HuntSessionLogParsedSchema>;
