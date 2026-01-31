import { z } from "zod";

import { MonsterSchema } from "@/modules/bestiary";
import { ItemSchema } from "@/modules/items";
import { PositiveNumberNonZero } from "@/schemas";

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

/** Partial item for pickers and relations (avoid importing full ItemSchema everywhere) */
export const ItemPreviewSchema = ItemSchema.pick({
  id: true,
  name: true,
  image_path: true,
});

/* ==========================================================================
   2. DB RELATION TABLE SCHEMAS (Pivot models)
   ========================================================================== */

/** Monster relation in session (DB join table) */

const MonsterPreyBonusSchema = z.object({
  // It is stored as a number in DB
  id: z.number(),
  prey: PreyBonusSchema,
});

export const HuntSessionKilledMonsterSchema = z.object({
  id: z.number(),
  count: z.number(),
  monster: MonsterPreviewSchema,
  prey_bonus: MonsterPreyBonusSchema.array().optional(),
});

/** Looted item relation */
export const HuntSessionLootedItemSchema = z.object({
  id: z.number(),
  count: z.number(),
  item: ItemPreviewSchema,
});

/** Supplies relation */
export const HuntSessionSupplySchema = z.object({
  id: z.number(),
  count: z.number(),
  supply: ItemPreviewSchema,
});

/** Damage element relation */
export const HuntSessionDamageElementSchema = z.object({
  id: z.number(),
  percent: PositiveNumberNonZero,
  damage_element: DamageElementSchema,
});

/** Damage source relation */
export const HuntSessionDamageSourceSchema = z.object({
  id: z.number(),
  percent: PositiveNumberNonZero,
  damage_source: DamageSourceSchema,
});
