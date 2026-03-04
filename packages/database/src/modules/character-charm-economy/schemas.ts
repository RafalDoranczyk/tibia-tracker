import { NonNegativeInt, z } from "@repo/validation";
import type { Tables } from "../../types/db";
import { CharacterIDSchema } from "../characters";

export const CharacterCharmEconomySchema = z.object({
  character_id: CharacterIDSchema,
  major_unlocked: NonNegativeInt,
  major_spent: NonNegativeInt,
  major_available: NonNegativeInt,
  minor_unlocked: NonNegativeInt,
  minor_spent: NonNegativeInt,
  minor_available: NonNegativeInt,
}) satisfies z.ZodType<Tables<"character_charm_economy">>;
export type CharacterCharmEconomy = z.infer<typeof CharacterCharmEconomySchema>;
