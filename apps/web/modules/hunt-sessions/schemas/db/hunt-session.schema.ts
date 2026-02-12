import { z } from "zod";

import type { Tables } from "@/core/supabase";
import { ISODate, LocalDatetime, PositiveInt } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";
import { HuntPlaceSchema } from "@/modules/hunt-places";

import {
  HuntSessionDamageElementSchema,
  HuntSessionDamageSourceSchema,
  HuntSessionKilledMonsterSchema,
  HuntSessionLootedItemSchema,
  HuntSessionSupplySchema,
} from "./hunt-session-relations.schema";

// 1. Computed fields on the server side impossible to set on insert
const HuntSessionDbFieldsComputedSchema = z.object({
  created_at: z.string(),
  raw_xp_per_hour: PositiveInt,
  profit_per_hour: z.number(),
  healing_per_hour: PositiveInt,
  damage_per_hour: PositiveInt,
  xp_per_hour: PositiveInt,
});

// 2. Base fields that are stored in the DB and can be set on insert/update
export const HuntSessionDbBaseFieldsSchema = z.object({
  id: PositiveInt,
  character_id: CharacterIDSchema,
  place_id: HuntPlaceSchema.shape.id,
  date: ISODate,
  started_at: LocalDatetime,
  ended_at: LocalDatetime,
  level: PositiveInt,
  player_count: PositiveInt,
  duration_seconds: PositiveInt,
  profit: z.number(),
  loot_value: PositiveInt,
  supplies_cost: PositiveInt,
  damage: PositiveInt,
  healing: PositiveInt,
  raw_xp_gain: PositiveInt,
  xp_gain: PositiveInt,
});

// 3. Full DB schema with computed fields, used for parsing DB response
export const HuntSessionDbFieldsSchema = HuntSessionDbBaseFieldsSchema.merge(
  HuntSessionDbFieldsComputedSchema
) satisfies z.ZodType<Tables<"hunt_sessions">>;
export type HuntSessionDbFields = z.infer<typeof HuntSessionDbFieldsSchema>;

/* 4. Full session with relations for single view */
export const HuntSessionSchema = HuntSessionDbFieldsSchema.extend({
  place: HuntPlaceSchema,
  killed_monsters: HuntSessionKilledMonsterSchema.array(),
  supplies: HuntSessionSupplySchema.array(),
  looted_items: HuntSessionLootedItemSchema.array(),
  damage_elements: HuntSessionDamageElementSchema.array(),
  monster_damage_sources: HuntSessionDamageSourceSchema.array(),
});
export type HuntSession = z.infer<typeof HuntSessionSchema>;

/* Session for list view */

export const HuntSessionListItemSchema = HuntSessionDbFieldsSchema.extend({
  place: HuntPlaceSchema.pick({ id: true, name: true, image_path: true }),
});

export type HuntSessionListItem = z.infer<typeof HuntSessionListItemSchema>;
