import { z } from "zod";

import { CharacterSchema } from "@/modules/characters";
import { HuntPlaceSchema } from "@/modules/hunt-places";
import { DateInputSchema, PositiveNumberNonZero } from "@/schemas/shared";

import {
  HuntSessionDamageElementSchema,
  HuntSessionDamageSourceSchema,
  HuntSessionItemSchema,
  HuntSessionMonsterSchema,
  HuntSessionSupplySchema,
} from "./relations.schema";

/* ========================================================================== */

export const HuntSessionDbFieldsComputedSchema = z.object({
  // Computed fields on the server side
  raw_xp_per_hour: PositiveNumberNonZero,
  profit_per_hour: z.number(),
  healing_per_hour: PositiveNumberNonZero,
  damage_per_hour: PositiveNumberNonZero,
  xp_per_hour: PositiveNumberNonZero,
});

export const HuntSessionDbFieldsSchema = z
  .object({
    id: z.number(),
    character_id: CharacterSchema.shape.id,
    place_id: HuntPlaceSchema.shape.id,
    date: DateInputSchema,
    created_at: DateInputSchema,
    started_at: DateInputSchema,
    ended_at: DateInputSchema,
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
  })
  .merge(HuntSessionDbFieldsComputedSchema);

/* Full session with relations for single view */
export const HuntSessionSchema = HuntSessionDbFieldsSchema.omit({
  place_id: true,
}).extend({
  place: HuntPlaceSchema,
  monsters: HuntSessionMonsterSchema.array(),

  // OPTIONAL
  items: HuntSessionItemSchema.array().optional(),
  supplies: HuntSessionSupplySchema.array().optional(),
  damage_elements: HuntSessionDamageElementSchema.array().optional(),
  damage_sources: HuntSessionDamageSourceSchema.array().optional(),
});
