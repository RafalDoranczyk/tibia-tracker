import { z } from "zod";

import { CharacterIDSchema } from "@/modules/characters";
import { NonNegativeInt, UUID } from "@/schemas";

import { CHARM_MAX_LEVEL } from "../constants";
import { CharmSchema } from "./charm.schema";

export const CharmLevelSchema = z.number().int().min(1).max(CHARM_MAX_LEVEL);
export type CharmLevel = z.infer<typeof CharmLevelSchema>;

export const CharacterCharmSchema = z.object({
  // Stored as UUID in supabase db
  id: UUID,
  character_id: CharacterIDSchema,
  charm_id: CharmSchema.shape.id,
  level: CharmLevelSchema,
});
export type CharacterCharm = z.infer<typeof CharacterCharmSchema>;

// Character charm enriched with charm details
export const CharacterCharmDetailedSchema = CharacterCharmSchema.extend({
  charm: CharmSchema,
});
export type CharacterCharmDetailed = z.infer<typeof CharacterCharmDetailedSchema>;

/* =========================================================
 * Charm economy (Supabase view)
 * ======================================================= */

export const CharacterCharmEconomySchema = z.object({
  character_id: CharacterIDSchema,
  major_unlocked: NonNegativeInt,
  major_spent: NonNegativeInt,
  major_available: NonNegativeInt,
  minor_unlocked: NonNegativeInt,
  minor_spent: NonNegativeInt,
  // It can be minustive if the character has spent more minor points than they have unlocked
  minor_available: z.number().int(),
});

export type CharacterCharmEconomy = z.infer<typeof CharacterCharmEconomySchema>;
