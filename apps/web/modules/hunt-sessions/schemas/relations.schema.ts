import { z } from "zod";

import { MonsterSchema } from "@/modules/bestiary";
import { ItemSchema } from "@/modules/items";
import { PositiveNumberNonZero } from "@/schemas/shared";

import { DamageElementSchema, LootedItemSchema, SupplyItemSchema } from "./catalog.schema";

/* ==========================================================================
   1. PREVIEW / LIGHT ENTITY TYPES (used in relations)
   ========================================================================== */

/** Partial monster for pickers and relations (avoid importing full MonsterSchema everywhere) */
export const MonsterPreviewSchema = MonsterSchema.pick({
  id: true,
  name: true,
  image_path: true,
});

export const ItemPreviewSchema = ItemSchema.pick({
  id: true,
  name: true,
  image_path: true,
});

/* ==========================================================================
   2. COUNT TYPES (used in forms, API payloads, parser)
   ========================================================================== */

/** Generic Count schema factory */
const CountSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  count: PositiveNumberNonZero,
});

/** Monster count inside hunt session */
export const MonsterCountSchema = CountSchema.extend({
  id: MonsterSchema.shape.id,
});

/** Looted item count */
export const LootedItemCountSchema = CountSchema.extend({
  id: LootedItemSchema.shape.id,
});

/** Supplies count */
export const SupplyCountSchema = CountSchema.extend({
  id: SupplyItemSchema.shape.id,
  count_per_hour: z.number().optional(),
});

/** Damage element % distribution */
export const DamageElementCountSchema = z.object({
  id: DamageElementSchema.shape.id,
  name: z.string().min(1),
  percent: PositiveNumberNonZero,
});

/* ==========================================================================
   3. DB RELATION TABLE SCHEMAS (Pivot models)
   ========================================================================== */

/** Monster relation in session (DB join table) */
export const HuntSessionMonsterSchema = z.object({
  id: z.number(),
  count: z.number(),
  monster: MonsterPreviewSchema,
});

/** Looted item relation */
export const HuntSessionItemSchema = z.object({
  id: z.number(),
  count: z.number(),
  item: LootedItemSchema,
});

/** Supplies relation */
export const HuntSessionSupplySchema = z.object({
  id: z.number(),
  count: z.number(),
  count_per_hour: z.number(),
  supply: SupplyItemSchema,
});

/** Damage element relation */
export const HuntSessionDamageElementSchema = z.object({
  id: z.number(),
  percent: z.number(),
  damage_element: DamageElementSchema,
});

/** Damage source relation (monster-based) */
export const HuntSessionDamageSourceSchema = z.object({
  id: z.number(),
  percent: PositiveNumberNonZero,
  damage_source: MonsterPreviewSchema,
});
