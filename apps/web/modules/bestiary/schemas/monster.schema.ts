import { z } from "zod";

import { NonEmptyString, NonNegativeInt, PositiveInt } from "@/schemas";

import { BESTIARY_CLASSES } from "../constants";

/**
 * Core domain entity: Monster
 */

export const BestiaryClassSchema = z.enum(BESTIARY_CLASSES);
export type BestiaryClass = z.infer<typeof BestiaryClassSchema>;

export const BestiaryDifficultySchema = z.number().int().min(1).max(5);
export type BestiaryDifficulty = z.infer<typeof BestiaryDifficultySchema>;

export const MonsterSchema = z.object({
  id: PositiveInt,
  name: NonEmptyString,
  exp: NonNegativeInt,
  image_path: NonEmptyString,
  hp: PositiveInt,
  elemental_resistances: z.record(z.string(), z.number()),
  charm_points: PositiveInt,
  bestiary_class: BestiaryClassSchema,
  bestiary_difficulty: BestiaryDifficultySchema,
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

export const BestiaryStageSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);

export type BestiaryStage = z.infer<typeof BestiaryStageSchema>;

export const MonsterWithCharacterProgressSchema = MonsterSchema.extend({
  kills: NonNegativeInt,
  // 1 = stage 1, 2 = stage 2, 3 = stage 3 (full bestiary)
  stage: BestiaryStageSchema,
  has_soul: z.boolean(),
});

export type MonsterWithCharacterProgress = z.infer<typeof MonsterWithCharacterProgressSchema>;
