import { LocalDatetime, NonNegativeInt, z } from "@repo/validation";
import type { Tables } from "../../types/db";
import { CharacterIDSchema } from "../characters/schemas";
import { MonsterSchema } from "../monsters";

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
