import { z } from "zod";

import { MonsterSchema } from "@/modules/bestiary";
import { ItemSchema } from "@/modules/items";
import { PositiveInt } from "@/schemas";

import { DamageElementSchema, DamageSourceSchema, PreyBonusSchema } from "./catalog.schema";

/* ==========================================================================
   1. PREVIEW / LIGHT ENTITY TYPES (used in relations)
   ========================================================================== */

/** Partial monster for pickers and relations (avoid importing full MonsterSchema everywhere) */
export const MonsterPreviewSchema = MonsterSchema.pick({
  id: true,
  name: true,
  image_path: true,
});
export type MonsterPreview = z.infer<typeof MonsterPreviewSchema>;

/** Partial item for pickers and relations (avoid importing full ItemSchema everywhere) */
export const ItemPreviewSchema = ItemSchema.pick({
  id: true,
  name: true,
  image_path: true,
});
export type ItemPreview = z.infer<typeof ItemPreviewSchema>;

/* ==========================================================================
   2. DB RELATION TABLE SCHEMAS (Pivot models)
   ========================================================================== */

/** Monster relation in session (DB join table) */

const MonsterPreyBonusSchema = z.object({
  // It is stored as a number in DB
  id: PositiveInt,
  prey: PreyBonusSchema,
});

export const HuntSessionKilledMonsterSchema = z.object({
  id: PositiveInt,
  count: PositiveInt,
  monster: MonsterPreviewSchema,
  prey_bonus: MonsterPreyBonusSchema.array().optional(),
});

/** Looted item relation */
export const HuntSessionLootedItemSchema = z.object({
  id: PositiveInt,
  count: PositiveInt,
  item: ItemPreviewSchema,
});

/** Supplies relation */
export const HuntSessionSupplySchema = z.object({
  id: PositiveInt,
  count: PositiveInt,
  supply: ItemPreviewSchema,
});

/** Damage element relation */
export const HuntSessionDamageElementSchema = z.object({
  id: PositiveInt,
  percent: PositiveInt,
  damage_element: DamageElementSchema,
});

/** Damage source relation */
export const HuntSessionDamageSourceSchema = z.object({
  id: PositiveInt,
  percent: PositiveInt,
  damage_source: DamageSourceSchema,
});
