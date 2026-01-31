import { z } from "zod";

import { PositiveNumber, PositiveNumberNonZero } from "@/schemas";

import { BestiaryClassSchema } from "./bestiaryFilters.schema";

/**
 * Core domain entity: Monster
 */
export const MonsterSchema = z.object({
  id: z.number(),
  name: z.string(),
  exp: PositiveNumber,
  image_path: z.string(),
  hp: PositiveNumberNonZero,
  elemental_resistances: z.record(z.string(), z.number()),
  charm_points: PositiveNumberNonZero,
  bestiary_class: BestiaryClassSchema,
  bestiary_difficulty: PositiveNumber,
  sort_order: PositiveNumber,
  bestiary_kills: z.object({
    stage1: PositiveNumber,
    stage2: PositiveNumber,
    stage3: PositiveNumber,
  }),
});

export type Monster = z.infer<typeof MonsterSchema>;

/**
 * Extended read model
 * (Monster + character progress)
 */
export const MonsterWithCharacterProgressSchema = MonsterSchema.extend({
  kills: PositiveNumber,
  stage: PositiveNumber,
  has_soul: z.boolean(),
});

export type MonsterWithCharacterProgress = z.infer<typeof MonsterWithCharacterProgressSchema>;
