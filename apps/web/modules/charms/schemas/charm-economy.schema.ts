import { z } from "zod";

import { CharacterSchema } from "@/modules/characters";

/* =========================================================
 * Charm economy (Supabase view)
 * ======================================================= */

export const CharmEconomySchema = z.object({
  character_id: CharacterSchema.shape.id,
  major_unlocked: z.number().int().nonnegative(),
  major_spent: z.number().int().nonnegative(),
  major_available: z.number().int().nonnegative(),
  minor_unlocked: z.number().int().nonnegative(),
  minor_spent: z.number().int().nonnegative(),
  minor_available: z.number().int().nonnegative(),
});

export type CharmEconomy = z.infer<typeof CharmEconomySchema>;
