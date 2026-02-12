import { z } from "zod";

import type { Enums, Tables } from "@/core/supabase/database.types";
import { NonEmptyString, NonNegativeInt, PositiveInt } from "@/lib/zod";

export const BestiaryClassSchema = z.enum([
  "Amphibic",
  "Aquatic",
  "Bird",
  "Construct",
  "Demon",
  "Dragon",
  "Elemental",
  "Extra Dimensional",
  "Fey",
  "Giant",
  "Human",
  "Humanoid",
  "Inkborn",
  "Lycanthrope",
  "Magical",
  "Mammal",
  "Plant",
  "Reptile",
  "Slime",
  "Undead",
  "Vermin",
]) satisfies z.ZodType<Enums<"bestiary_class">>;
export type BestiaryClass = z.infer<typeof BestiaryClassSchema>;

// We can use it as a labels for UI cause it's already human readable, so no need for a separate mapping
export const BESTIARY_CLASSES = BestiaryClassSchema.options;

// Difficulty is a number from 1 to 5, representing the difficulty of the monster, with 1 being the easiest and 5 being the hardest.
export const BestiaryDifficultySchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);
export type BestiaryDifficulty = z.infer<typeof BestiaryDifficultySchema>;
export const BESTIARY_DIFFICULTIES = [1, 2, 3, 4, 5] as const satisfies BestiaryDifficulty[];

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
  bestiary_difficulty: BestiaryDifficultySchema,
  sort_order: PositiveInt,
  // Kills required to reach each bestiary stage
  bestiary_kills: z.object({
    stage1: PositiveInt,
    stage2: PositiveInt,
    stage3: PositiveInt,
  }),
}) satisfies z.ZodType<Tables<"monsters">>;
export type Monster = z.infer<typeof MonsterSchema>;
