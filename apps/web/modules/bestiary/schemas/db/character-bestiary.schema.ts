import { z } from "zod";
import type { Tables } from "@/core/supabase/types";
import { LocalDatetime, NonNegativeInt } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";
import { BestiaryClassSchema, MonsterSchema } from "@/modules/monsters";

/**
 * VIEW: character_bestiary_summary
 * Global bestiary summary for a character
 */
export const CharacterBestiarySummarySchema = z.object({
  character_id: CharacterIDSchema,
  unlocked_charm_points: NonNegativeInt,
  total_charm_points: NonNegativeInt,
  completed_soulpits: NonNegativeInt,
}) satisfies z.ZodType<Tables<"character_bestiary_summary">>;
export type CharacterBestiarySummary = z.infer<typeof CharacterBestiarySummarySchema>;

/**
 * VIEW: character_bestiary_class_summary
 * Bestiary summary scoped to a single class
 */
export const CharacterBestiaryClassSummarySchema = z.object({
  character_id: CharacterIDSchema,
  bestiary_class: BestiaryClassSchema,
  total_monsters: NonNegativeInt,
  completed_monsters: NonNegativeInt,
  completed_soulpits: NonNegativeInt,
  total_charm_points: NonNegativeInt,
  unlocked_charm_points: NonNegativeInt,
}) satisfies z.ZodType<Tables<"character_bestiary_class_summary">>;
export type CharacterBestiaryClassSummary = z.infer<typeof CharacterBestiaryClassSummarySchema>;

/**
 * JOIN: character_bestiary + monster
 * Used for detailed views / admin / debugging
 */

// The character's progress for a specific monster, including the bestiary stage and kills
const BestiaryStageSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);
export type BestiaryStage = z.infer<typeof BestiaryStageSchema>;

/**
 * DB TABLE: character_bestiary
 */
export const CharacterBestiarySchema = z.object({
  character_id: CharacterIDSchema,
  created_at: LocalDatetime,
  monster_id: z.number(),
  kills: NonNegativeInt,
  stage: BestiaryStageSchema,
  has_soul: z.boolean(),
}) satisfies z.ZodType<Tables<"character_bestiary">>;

/**
 * RPC: get_monsters_with_character_progress
 */
export const MonsterWithCharacterProgressSchema = MonsterSchema.extend({
  kills: NonNegativeInt,
  stage: BestiaryStageSchema,
  has_soul: z.boolean(),
  total_count: z.number(),
});

export type MonsterWithCharacterProgress = z.infer<typeof MonsterWithCharacterProgressSchema>;
