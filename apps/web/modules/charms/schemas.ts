import { z } from "zod";

import { PositiveNumber, Uuid } from "@/schemas";

import { CHARM_MAX_LEVEL } from "./constants";

/* =========================================================
 * Shared
 * ======================================================= */

export const CharmTypeSchema = z.enum(["major", "minor"]);

export const CharmLevelSchema = z.number().int().min(1).max(CHARM_MAX_LEVEL);
export const CharmLevelOrZeroSchema = z.number().int().min(0).max(CHARM_MAX_LEVEL);

/* =========================================================
 * Domain: Charm definition
 * ======================================================= */

export const CharmLevelDataSchema = z.object({
  cost: PositiveNumber,
  effect: z.string().nullable(),
});

export const CharmLevelsSchema = z.object({
  1: CharmLevelDataSchema,
  2: CharmLevelDataSchema,
  3: CharmLevelDataSchema,
});

// View in supabase
export const CharmEconomySchema = z.object({
  character_id: Uuid,
  major_unlocked: PositiveNumber,
  major_spent: PositiveNumber,
  major_available: PositiveNumber,
  minor_unlocked: PositiveNumber,
  minor_spent: PositiveNumber,
  minor_available: z.number().int(),
});

export const CharmSchema = z.object({
  id: Uuid,
  name: z.string(),
  type: CharmTypeSchema,
  description: z.string().nullable(),
  levels: CharmLevelsSchema,
  image_path: z.string(),
});

/* =========================================================
 * DB: charms (raw)
 * ======================================================= */

export const CharmRowSchema = z.object({
  id: Uuid,
  name: z.string(),
  type: CharmTypeSchema,
  description: z.string().nullable(),

  cost_lvl1: PositiveNumber,
  cost_lvl2: PositiveNumber,
  cost_lvl3: PositiveNumber,

  effect_lvl1: z.string().nullable(),
  effect_lvl2: z.string().nullable(),
  effect_lvl3: z.string().nullable(),

  image_path: z.string(),
});

/* =========================================================
 * DB: character_charms
 * ======================================================= */

export const CharacterCharmRowSchema = z.object({
  id: Uuid,
  character_id: Uuid,
  charm_id: Uuid,
  level: CharmLevelSchema,
  unlocked_at: z.string(),
});

export const CharacterCharmRowWithCharmSchema = CharacterCharmRowSchema.extend({
  charm: CharmRowSchema,
});

/* =========================================================
 * Domain: Progress
 * ======================================================= */

export const CharmProgressSchema = z.object({
  unlocked: z.boolean(),
  level: CharmLevelOrZeroSchema,
  unlocked_at: z.string().nullable(),
});

export const CharmWithProgressSchema = CharmSchema.extend({
  progress: CharmProgressSchema,
});

/* =========================================================
 * API
 * ======================================================= */

export const FetchCharacterCharmsResponseSchema = z.array(CharacterCharmRowWithCharmSchema);

export const CharacterCharmUpsertPayloadSchema = z.object({
  characterId: Uuid,
  charmId: Uuid,
  level: CharmLevelSchema,
});

export const DeleteCharacterCharmPayloadSchema = z.object({
  charmId: Uuid,
  characterId: Uuid,
});
