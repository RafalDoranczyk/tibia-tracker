import type { Enums, Tables } from "@repo/database";
import { z } from "zod";
import { NonEmptyString, NonNegativeInt, PositiveInt } from "@/lib/zod";
import { DamageElementSlugs } from "@/modules/damage-elements";

export const MonsterClassSchema = z.enum([
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
]) satisfies z.ZodType<Enums<"monster_class">>;
export type MonsterClass = z.infer<typeof MonsterClassSchema>;
// We can use it as a labels for UI cause it's already human readable, so no need for a separate mapping
export const MONSTER_CLASSES = MonsterClassSchema.options;

export const MonsterDifficultySchema = z.enum([
  "Harmless",
  "Trivial",
  "Easy",
  "Medium",
  "Hard",
  "Challenging",
]) satisfies z.ZodType<Enums<"monster_difficulty">>;
export type MonsterDifficulty = z.infer<typeof MonsterDifficultySchema>;
// We can use it as a labels for UI cause it's already human readable, so no need for a separate mapping
export const MONSTER_DIFFICULTIES = MonsterDifficultySchema.options;

export const MonsterRaritySchema = z.enum(["Ordinary", "Very Rare"]) satisfies z.ZodType<
  Enums<"monster_rarity">
>;
export type MonsterRarity = z.infer<typeof MonsterRaritySchema>;

/**
 * Core domain entity: Monster
 */
export const MonsterSchema = z.object({
  id: PositiveInt,
  name: NonEmptyString,
  exp: NonNegativeInt,
  image_path: NonEmptyString,
  hp: PositiveInt,
  elemental_resistances: z.record(DamageElementSlugs, z.number().optional()),
  charm_points: PositiveInt,
  monster_class: MonsterClassSchema,
  difficulty: MonsterDifficultySchema,
  sort_order: PositiveInt,
  // Kills required to reach each bestiary stage
  bestiary_kills: z.object({
    stage1: PositiveInt,
    stage2: PositiveInt,
    stage3: PositiveInt,
  }),
  rarity: MonsterRaritySchema,
}) satisfies z.ZodType<Tables<"monsters">>;
export type Monster = z.infer<typeof MonsterSchema>;
