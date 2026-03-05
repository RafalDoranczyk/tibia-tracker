import { LocalDatetime, NonNegativeInt, z } from "@repo/validation";
import type { Enums, Tables } from "../../types/db";
import { CharacterIDSchema } from "../characters/schemas";
import { MonsterClassSchema, MonsterSchema } from "../monsters";

// --- 1. Basic Enums & Primitives ---

const BestiaryStageSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);
export type BestiaryStage = z.infer<typeof BestiaryStageSchema>;

export const BestiaryStageFilterSchema = z.enum(["completed", "not_completed"]) satisfies z.ZodType<
  Enums<"bestiary_stage_filter">
>;
export type BestiaryStageFilter = z.infer<typeof BestiaryStageFilterSchema>;

// --- 2. DB Tables ---

/**
 * DB TABLE: character_bestiary
 * Stores the core progress of a character in the bestiary.
 */
export const CharacterBestiarySchema = z.object({
  character_id: CharacterIDSchema,
  created_at: LocalDatetime,
  monster_id: z.number(),
  kills: NonNegativeInt,
  stage: BestiaryStageSchema,
  has_soul: z.boolean(),
}) satisfies z.ZodType<Tables<"character_bestiary">>;

export type CharacterBestiary = z.infer<typeof CharacterBestiarySchema>;

// --- 3. Database Views ---

/**
 * VIEW: character_bestiary_class_summary
 * Aggregated bestiary statistics scoped to a single monster class.
 */
export const CharacterBestiaryClassSummarySchema = z.object({
  character_id: CharacterIDSchema,
  monster_class: MonsterClassSchema,
  total_monsters: NonNegativeInt,
  completed_monsters: NonNegativeInt,
  completed_soulpits: NonNegativeInt,
  total_charm_points: NonNegativeInt,
  unlocked_charm_points: NonNegativeInt,
}) satisfies z.ZodType<Tables<"character_bestiary_class_summary">>;

export type CharacterBestiaryClassSummary = z.infer<typeof CharacterBestiaryClassSummarySchema>;

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

// --- 4. RPC & Business Logic Schemas ---

/**
 * RPC: get_monsters_with_character_progress
 * Extends Monster with character-specific progress for list views.
 */
export const MonsterWithCharacterProgressSchema = MonsterSchema.extend({
  kills: NonNegativeInt,
  stage: BestiaryStageSchema,
  has_soul: z.boolean(),
  total_count: z.number(),
});

export type MonsterWithCharacterProgress = z.infer<typeof MonsterWithCharacterProgressSchema>;
