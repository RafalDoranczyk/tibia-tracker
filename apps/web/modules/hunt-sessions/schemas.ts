import { z } from "zod";

import { DateInputSchema, PositiveNumberNonZero } from "@/schemas/shared";

import { MonsterSchema } from "../bestiary/schemas";
import { CharacterSchema } from "../characters";
import { HuntPlaceSchema } from "../hunt-places";
import { calcCountPerHour } from "./utils/calcCountPerHour";

/* ==========================================================================
   1. DICTIONARY SCHEMAS (Base entities from database)
   ========================================================================== */

export const SupplyItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  image_url: z.string(),
});

export const DamageElementSchema = z.object({
  id: z.number(),
  name: z.string(),
  image_url: z.string(),
});

/** Partial monster for pickers and lists */
export const MonsterPreviewSchema = MonsterSchema.pick({
  id: true,
  name: true,
  image_url: true,
});

/* ==========================================================================
   2. RELATION & SUB-OBJECT SCHEMAS (Items inside a session)
   ========================================================================== */

/** Helper for form/payload: simplified monster count by name */
export const MonsterCountSchema = z.object({
  id: MonsterSchema.shape.id,
  name: z.string().min(1),
  count: PositiveNumberNonZero,
});

export const SupplyCountSchema = z.object({
  id: SupplyItemSchema.shape.id,
  name: z.string().min(1),
  count: PositiveNumberNonZero,
  count_per_hour: z.number().optional(),
});

export const DamageElementCountSchema = z.object({
  id: DamageElementSchema.shape.id,
  name: z.string().min(1),
  percent: PositiveNumberNonZero,
});

/* ==========================================================================
   3. MAIN HUNT SESSION SCHEMAS
   ========================================================================== */
export const HuntSessionDbFieldsSchema = z.object({
  id: z.number(),
  character_id: CharacterSchema.shape.id,
  level: PositiveNumberNonZero,
  balance: z.number(),
  date: DateInputSchema,
  minutes: PositiveNumberNonZero,
  player_count: PositiveNumberNonZero,
  raw_xp_gain: PositiveNumberNonZero,
  xp_gain: PositiveNumberNonZero,
  raw_exp_per_hour: PositiveNumberNonZero,
  profit_per_hour: z.number(),
  place_id: HuntPlaceSchema.shape.id,
});

/** Represents a monster entry within a saved Hunt Session */
const HuntSessionMonsterSchema = z.object({
  id: z.number(),
  count: z.number(),
  monster: MonsterPreviewSchema,
});

const HuntSessionSupplySchema = z.object({
  id: z.number(),
  count: z.number(),
  count_per_hour: z.number(),
  supply: SupplyItemSchema,
});

const HuntSessionDamageElementSchema = z.object({
  id: z.number(),
  percent: z.number(),
  damage_element: DamageElementSchema,
});

export const HuntSessionDamageSourceSchema = z.object({
  // Stored as number in DB
  id: z.number(),
  percent: PositiveNumberNonZero,
  damage_source: MonsterPreviewSchema,
});

export const HuntSessionSchema = HuntSessionDbFieldsSchema.omit({
  place_id: true,
}).extend({
  // Relations
  place: HuntPlaceSchema,
  // There relations are fetched only in detailed view
  monsters: HuntSessionMonsterSchema.array().optional(),
  supplies: HuntSessionSupplySchema.array().optional(),
  damage_elements: HuntSessionDamageElementSchema.array().optional(),
  damage_sources: HuntSessionDamageSourceSchema.array().optional(),
});

/* ==========================================================================
   4. API & FORM SCHEMAS
   ========================================================================== */

/* --- Fetching --- */
export const FetchHuntSessionsListPayloadSchema = z.object({
  character_id: CharacterSchema.shape.id,
  limit: z.number().min(1).optional(),
  offset: z.number().min(0).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  orderBy: z.enum(["date", "level", "minutes", "raw_xp_gain", "balance"]).optional(),
});

export const FetchHuntSessionsListResponseSchema = z.object({
  count: z.number(),
  data: z.array(HuntSessionSchema),
});

/* --- Mutations --- */
const HuntSessionPayloadBaseSchema = HuntSessionDbFieldsSchema.extend({
  monsters: MonsterCountSchema.array(),
  supplies: SupplyCountSchema.array(),
  damage_elements: DamageElementCountSchema.array(),
  damage_sources: HuntSessionDamageSourceSchema.array(),
}).omit({
  id: true,
  raw_exp_per_hour: true,
  profit_per_hour: true,
});

export const CreateHuntSessionPayloadSchema = HuntSessionPayloadBaseSchema.transform((data) => ({
  ...data,
  raw_exp_per_hour: Math.round((data.raw_xp_gain * 60) / data.minutes),
  profit_per_hour: Math.round((data.balance * 60) / data.minutes),
  supplies: calcCountPerHour(data.supplies ?? [], data.minutes),
}));

export const UpdateHuntSessionPayloadSchema = HuntSessionPayloadBaseSchema.extend({
  id: z.number(),
});

export const DeleteHuntSessionPayloadSchema = z.object({
  id: z.number(),
});

/* --- React Hook Form --- */
const uniqueNames = (items: { name: string }[]) =>
  new Set(items.map((i) => i.name)).size === items.length;

export const HuntSessionFormSchema = HuntSessionDbFieldsSchema.omit({
  raw_exp_per_hour: true,
  profit_per_hour: true,
}).extend({
  id: HuntSessionDbFieldsSchema.shape.id.optional(),
  monsters: MonsterCountSchema.array().refine((items) => uniqueNames(items), {
    message: "Monsters must be unique",
  }),
  supplies: SupplyCountSchema.array().refine((items) => uniqueNames(items), {
    message: "Supplies must be unique",
  }),
  damage_elements: DamageElementCountSchema.array().refine((items) => uniqueNames(items), {
    message: "Damage elements must be unique",
  }),
  damage_sources: HuntSessionDamageSourceSchema.array().refine(
    (items) => new Set(items.map((i) => i.id)).size === items.length,
    {
      message: "Damage sources must be unique",
    }
  ),
});
