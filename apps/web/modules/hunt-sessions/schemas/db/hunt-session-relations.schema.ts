import { z } from "zod";

import { NonEmptyString, PositiveInt } from "@/lib/zod";
import { MonsterSchema } from "@/modules/bestiary";
import { CharmSchema } from "@/modules/charms";
import { ItemPreviewSchema } from "@/modules/items";

import { DamageElementSchema } from "./damage-elements.schema";
import { PreyBonusSchema } from "./prey-bonus.schema";

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

/* ==========================================================================
   2. DB RELATION TABLE SCHEMAS (Pivot models)
   ========================================================================== */

/** Monster relation in session (DB join table) */

const MonsterPreyBonusSchema = z.object({
  prey: PreyBonusSchema,
});

const MonsterCharmBonusSchema = z.object({
  charm: CharmSchema.pick({
    id: true,
    name: true,
    image_path: true,
    type: true,
  }),
});

export const HuntSessionKilledMonsterSchema = z.object({
  id: PositiveInt,
  count: PositiveInt,
  monster: MonsterPreviewSchema,
  prey_bonus: MonsterPreyBonusSchema.array().optional(),
  charm_bonus: MonsterCharmBonusSchema.array().optional(),
});

/** Looted item relation */
export const HuntSessionLootedItemSchema = z.object({
  id: PositiveInt,
  count: PositiveInt,
  item: ItemPreviewSchema,
});

/** Supplies relation */
export const HuntSessionSupplySchema = z.object({
  count: PositiveInt,
  item: ItemPreviewSchema,
});

/** Damage element relation */
export const HuntSessionDamageElementSchema = z.object({
  percent: z.number().positive(),
  damage_element: DamageElementSchema,
});

/** Monster damage source relation */
export const MonsterDamageSourceSchema = z.object({
  id: PositiveInt,
  name: NonEmptyString,
  image_path: NonEmptyString,
});

export const HuntSessionDamageSourceSchema = z.object({
  percent: z.number().positive(),
  damage_source: MonsterDamageSourceSchema,
});
