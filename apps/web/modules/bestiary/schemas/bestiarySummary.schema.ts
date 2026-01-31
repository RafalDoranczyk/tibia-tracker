import { z } from "zod";

import { CharacterSchema } from "@/modules/characters";
import { NonNegativeInt } from "@/schemas";

import { BestiaryClassSchema } from "./bestiaryFilters.schema";

/**
 * Global bestiary summary for a character
 */
export const CharacterBestiarySummarySchema = z.object({
  character_id: CharacterSchema.shape.id,
  unlocked_charm_points: NonNegativeInt,
  total_charm_points: NonNegativeInt,
  completed_soulpits: NonNegativeInt,
});

export type CharacterBestiarySummary = z.infer<typeof CharacterBestiarySummarySchema>;

/**
 * Summary scoped to a specific bestiary class
 */
export const CharacterBestiaryClassSummarySchema = z.object({
  character_id: CharacterSchema.shape.id,
  bestiary_class: BestiaryClassSchema,
  total_monsters: NonNegativeInt,
  completed_monsters: NonNegativeInt,
  completed_soulpits: NonNegativeInt,
  total_charm_points: NonNegativeInt,
  unlocked_charm_points: NonNegativeInt,
});

export type CharacterBestiaryClassSummary = z.infer<typeof CharacterBestiaryClassSummarySchema>;
