import { z } from "zod";

import { CharacterSchema } from "@/modules/characters";
import { HuntPlaceSchema } from "@/modules/hunt-places";
import { ISODateToYYYYMMDD, PositiveNumberNonZero } from "@/schemas";

import {
  HuntSessionDamageElementSchema,
  HuntSessionDamageSourceSchema,
  HuntSessionKilledMonsterSchema,
  HuntSessionLootedItemSchema,
  HuntSessionSupplySchema,
} from "./relations.schema";

// Computed fields on the server side
const HuntSessionDbFieldsComputedSchema = z.object({
  created_at: ISODateToYYYYMMDD,
  raw_xp_per_hour: PositiveNumberNonZero,
  profit_per_hour: z.number(),
  healing_per_hour: PositiveNumberNonZero,
  damage_per_hour: PositiveNumberNonZero,
  xp_per_hour: PositiveNumberNonZero,
});

export const HuntSessionDbBaseFieldsSchema = z.object({
  id: z.number(),
  character_id: CharacterSchema.shape.id,
  place_id: HuntPlaceSchema.shape.id,
  date: ISODateToYYYYMMDD,
  started_at: ISODateToYYYYMMDD,
  ended_at: ISODateToYYYYMMDD,
  level: PositiveNumberNonZero,
  player_count: PositiveNumberNonZero,
  duration_seconds: PositiveNumberNonZero,
  profit: z.number(),
  loot_value: PositiveNumberNonZero,
  supplies_cost: PositiveNumberNonZero,
  damage: PositiveNumberNonZero,
  healing: PositiveNumberNonZero,
  raw_xp_gain: PositiveNumberNonZero,
  xp_gain: PositiveNumberNonZero,
});

export const HuntSessionDbFieldsSchema = HuntSessionDbBaseFieldsSchema.merge(
  HuntSessionDbFieldsComputedSchema
);

/* Full session with relations for single view */
export const HuntSessionSchema = HuntSessionDbFieldsSchema.extend({
  place: HuntPlaceSchema,
  killed_monsters: HuntSessionKilledMonsterSchema.array(),
  supplies: HuntSessionSupplySchema.array(),
  looted_items: HuntSessionLootedItemSchema.array(),
  damage_elements: HuntSessionDamageElementSchema.array(),
  damage_sources: HuntSessionDamageSourceSchema.array(),
});

/* Session for list view */
export const HuntSessionListItemSchema = HuntSessionDbFieldsSchema.extend({
  place: HuntPlaceSchema,
});
