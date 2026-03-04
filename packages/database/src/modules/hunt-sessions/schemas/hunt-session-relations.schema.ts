import { NonEmptyString, PositiveInt, z } from "@repo/validation";
import { CharmSchema } from "../../charms/schemas";
import { DamageElementSchema } from "../../damage-elements/schemas";
import { ItemPreviewSchema } from "../../items/schemas";
import { MonsterSchema } from "../../monsters/schemas";
import { PreyBonusSchema } from "../../prey-bonuses/schemas";

// --- 1. ENTITY PREVIEWS ---

/** Lightweight monster entity for relation views */
export const MonsterPreviewSchema = MonsterSchema.pick({
  id: true,
  name: true,
  image_path: true,
});

export type MonsterPreview = z.infer<typeof MonsterPreviewSchema>;

// --- 2. RELATION SUB-SCHEMAS ---

/** Nested bonus details within a killed monster relation */
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

/** Damage source identification */
export const HuntSessionMonsterDamageSourceSchema = z.object({
  id: PositiveInt,
  name: NonEmptyString,
  image_path: NonEmptyString,
});

// --- 3. SESSION RELATION SCHEMAS (Pivot Models) ---

/** Join data for monsters killed during session */
export const HuntSessionKilledMonsterSchema = z.object({
  id: PositiveInt,
  count: PositiveInt,
  monster: MonsterPreviewSchema,
  prey_bonus: MonsterPreyBonusSchema.array().optional(),
  charm_bonus: MonsterCharmBonusSchema.array().optional(),
});

/** Join data for items looted during session */
export const HuntSessionLootedItemSchema = z.object({
  id: PositiveInt,
  count: PositiveInt,
  item: ItemPreviewSchema,
});

/** Join data for supplies used during session */
export const HuntSessionSupplySchema = z.object({
  count: PositiveInt,
  item: ItemPreviewSchema,
});

/** Data for damage elements distribution */
export const HuntSessionDamageElementSchema = z.object({
  percent: z.number().positive(),
  damage_element: DamageElementSchema,
});

/** Data for damage sources (monsters) distribution */
export const HuntSessionDamageSourceSchema = z.object({
  percent: z.number().positive(),
  damage_source: HuntSessionMonsterDamageSourceSchema,
});
