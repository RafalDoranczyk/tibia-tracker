import { NonNegativeInt, z } from "@repo/validation";
import type { Tables } from "../../types/db";
import { CharacterIDSchema } from "../characters/schemas";
import { CharmSchema } from "../charms/schemas";

// --- Enums & Primitives ---
export const CHARM_LEVELS = [1, 2, 3] as const;
export type CharmLevel = (typeof CHARM_LEVELS)[number];
export const CharmLevelSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);

// --- DB Tables & Views ---

export const CharacterCharmSchema = z.object({
  character_id: CharacterIDSchema,
  charm_id: CharmSchema.shape.id,
  level: CharmLevelSchema,
}) satisfies z.ZodType<Tables<"character_charms">>;

export type CharacterCharm = z.infer<typeof CharacterCharmSchema>;

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

// --- Detailed Views ---

export const CharacterCharmDetailedSchema = CharacterCharmSchema.extend({
  charm: CharmSchema,
});

export type CharacterCharmDetailed = z.infer<typeof CharacterCharmDetailedSchema>;
