import { NonNegativeInt, z } from "@repo/validation";
import type { Tables } from "../../types/db";
import { CharacterIDSchema } from "../characters/schemas";
import { MonsterClassSchema } from "../monsters";

/**
 * VIEW: character_bestiary_class_summary
 * Bestiary summary scoped to a single class
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
