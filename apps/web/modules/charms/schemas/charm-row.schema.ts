import { z } from "zod";

import { CharacterSchema } from "@/modules/characters";
import { NonEmptyString, PositiveInt, UUID } from "@/schemas";

import { CharmLevelSchema, CharmTypeSchema } from "./charm.schema";

/* =========================================================
 * DB: charms table
 * ======================================================= */

export const CharmRowSchema = z.object({
  id: UUID,
  name: NonEmptyString,
  type: CharmTypeSchema,
  description: NonEmptyString,
  cost_lvl1: PositiveInt,
  cost_lvl2: PositiveInt,
  cost_lvl3: PositiveInt,
  effect_lvl1: NonEmptyString,
  effect_lvl2: NonEmptyString,
  effect_lvl3: NonEmptyString,
  image_path: NonEmptyString,
});
export type CharmRow = z.infer<typeof CharmRowSchema>;

/* =========================================================
 * DB: character_charms table
 * ======================================================= */

export const CharacterCharmRowSchema = z.object({
  id: UUID,
  character_id: CharacterSchema.shape.id,
  charm_id: UUID,
  level: CharmLevelSchema,
  unlocked_at: z.string(),
});
export type CharacterCharmRowWithCharm = z.infer<typeof CharacterCharmRowWithCharmSchema>;

export const CharacterCharmRowWithCharmSchema = CharacterCharmRowSchema.extend({
  charm: CharmRowSchema,
});
