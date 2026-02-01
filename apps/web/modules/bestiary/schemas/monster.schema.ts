import { z } from "zod";

import { NonEmptyString, NonNegativeInt, PositiveInt } from "@/schemas";

import { BestiaryClassSchema } from "./bestiaryFilters.schema";

/**
 * Core domain entity: Monster
 */
export const MonsterSchema = z.object({
  id: PositiveInt,
  name: NonEmptyString,
  exp: NonNegativeInt,
  image_path: NonEmptyString,
  hp: PositiveInt,
  elemental_resistances: z.record(z.string(), z.number()),
  charm_points: PositiveInt,
  bestiary_class: BestiaryClassSchema,
  bestiary_difficulty: PositiveInt,
  sort_order: PositiveInt,
  bestiary_kills: z.object({
    stage1: PositiveInt,
    stage2: PositiveInt,
    stage3: PositiveInt,
  }),
});

export type Monster = z.infer<typeof MonsterSchema>;

/**
 * Extended read model
 * (Monster + character progress)
 */
export const MonsterWithCharacterProgressSchema = MonsterSchema.extend({
  kills: NonNegativeInt,
  stage: NonNegativeInt,
  has_soul: z.boolean(),
});

export type MonsterWithCharacterProgress = z.infer<typeof MonsterWithCharacterProgressSchema>;
