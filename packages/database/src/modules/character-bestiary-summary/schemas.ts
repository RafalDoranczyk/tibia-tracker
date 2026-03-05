import { NonNegativeInt, z } from "@repo/validation";
import type { Tables } from "../../types/db";
import { CharacterIDSchema } from "../characters/schemas";

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
