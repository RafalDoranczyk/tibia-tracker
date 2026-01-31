import { z } from "zod";

import { CharacterSchema } from "@/modules/characters";
import { PositiveNumber } from "@/schemas";

import { BestiaryClassSchema } from "./bestiaryFilters.schema";

/**
 * Global bestiary summary for a character
 */
export const CharacterBestiarySummarySchema = z.object({
  character_id: CharacterSchema.shape.id,
  unlocked_charm_points: PositiveNumber,
  total_charm_points: PositiveNumber,
  completed_soulpits: PositiveNumber,
});

export type CharacterBestiarySummary = z.infer<typeof CharacterBestiarySummarySchema>;

/**
 * Summary scoped to a specific bestiary class
 */
export const CharacterBestiaryClassSummarySchema = z.object({
  character_id: CharacterSchema.shape.id,
  bestiary_class: BestiaryClassSchema,
  total_monsters: PositiveNumber,
  completed_monsters: PositiveNumber,
  completed_soulpits: PositiveNumber,
  total_charm_points: PositiveNumber,
  unlocked_charm_points: PositiveNumber,
});

export type CharacterBestiaryClassSummary = z.infer<typeof CharacterBestiaryClassSummarySchema>;
