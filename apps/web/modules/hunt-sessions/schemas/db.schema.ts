import { z } from "zod";

import { CharacterIDSchema } from "@/modules/characters";
import { HuntPlaceSchema } from "@/modules/hunt-places";
import { ISODate, LocalDatetime, PositiveInt } from "@/schemas";

import {
  HuntSessionDamageElementSchema,
  HuntSessionDamageSourceSchema,
  HuntSessionKilledMonsterSchema,
  HuntSessionLootedItemSchema,
  HuntSessionSupplySchema,
} from "./relations.schema";

// Computed fields on the server side impossible to set on insert
const HuntSessionDbFieldsComputedSchema = z.object({
  raw_xp_per_hour: PositiveInt,
  profit_per_hour: z.number(),
  healing_per_hour: PositiveInt,
  damage_per_hour: PositiveInt,
  xp_per_hour: PositiveInt,
});

export const HuntSessionDbBaseFieldsSchema = z.object({
  id: z.number(),
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

export const HuntSessionDbFieldsSchema = HuntSessionDbBaseFieldsSchema.merge(
  HuntSessionDbFieldsComputedSchema
);
export type HuntSessionDbFields = z.infer<typeof HuntSessionDbFieldsSchema>;

export const HuntSessionStatFormSchema = z.object({
  statDefinitionId: z.string().uuid(),
  damageElementId: z.number().nullable().optional(),
  value: z.number(),
});

/* Full session with relations for single view */
export const HuntSessionSchema = HuntSessionDbFieldsSchema.extend({
  place: HuntPlaceSchema,
  killed_monsters: HuntSessionKilledMonsterSchema.array(),
  supplies: HuntSessionSupplySchema.array(),
  looted_items: HuntSessionLootedItemSchema.array(),
  damage_elements: HuntSessionDamageElementSchema.array(),
  damage_sources: HuntSessionDamageSourceSchema.array(),
  stats: HuntSessionStatFormSchema.array(),
});
export type HuntSession = z.infer<typeof HuntSessionSchema>;

/* Session for list view */
export const HuntSessionListItemSchema = HuntSessionDbFieldsSchema.extend({
  place: HuntPlaceSchema,
});
export type HuntSessionListItem = z.infer<typeof HuntSessionListItemSchema>;
