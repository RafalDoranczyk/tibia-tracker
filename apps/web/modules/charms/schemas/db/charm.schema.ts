import { z } from "zod";

import type { Enums, Tables } from "@/core/supabase";
import { NonEmptyString, NonNegativeInt, PositiveInt } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";

export const CharmTypeSchema = z.enum(["major", "minor"]) satisfies z.ZodType<Enums<"charm_type">>;
export type CharmType = z.infer<typeof CharmTypeSchema>;

// Public charms, not linked to any user
export const CharmSchema = z.object({
  id: z.number(),
  name: NonEmptyString,
  type: CharmTypeSchema,
  description: NonEmptyString,
  cost_lvl1: PositiveInt,
  effect_lvl1: NonEmptyString,
  cost_lvl2: PositiveInt,
  effect_lvl2: NonEmptyString,
  cost_lvl3: PositiveInt,
  effect_lvl3: NonEmptyString,
  image_path: NonEmptyString,
}) satisfies z.ZodType<Tables<"charms">>;
export type Charm = z.infer<typeof CharmSchema>;

export const CHARM_LEVELS = [1, 2, 3] as const;

export type CharmLevel = (typeof CHARM_LEVELS)[number];

export const CharmLevelSchema = z.union(
  CHARM_LEVELS.map((lvl) => z.literal(lvl)) as [
    z.ZodLiteral<CharmLevel>,
    z.ZodLiteral<CharmLevel>,
    z.ZodLiteral<CharmLevel>,
  ]
);

// Charms linked to a character, with their current level
export const CharacterCharmSchema = z.object({
  character_id: CharacterIDSchema,
  charm_id: CharmSchema.shape.id,
  level: CharmLevelSchema,
}) satisfies z.ZodType<Tables<"character_charms">>;
export type CharacterCharm = z.infer<typeof CharacterCharmSchema>;

export const CharacterCharmDetailedSchema = CharacterCharmSchema.extend({
  charm: CharmSchema,
});
export type CharacterCharmDetailed = z.infer<typeof CharacterCharmDetailedSchema>;

// Economy of charms for a character, tracking how many charm points have been unlocked etc.
export const CharacterCharmEconomySchema = z.object({
  character_id: CharacterIDSchema,
  major_unlocked: NonNegativeInt,
  major_spent: NonNegativeInt,
  major_available: NonNegativeInt,
  minor_unlocked: NonNegativeInt,
  minor_spent: NonNegativeInt,
  minor_available: z.number().int(),
}) satisfies z.ZodType<Tables<"character_charm_economy">>;
export type CharacterCharmEconomy = z.infer<typeof CharacterCharmEconomySchema>;
