import { z } from "zod";

import { NonEmptyString, UUID } from "@/schemas";

import { CHARM_MAX_LEVEL } from "../constants";

/* =========================================================
 * Core charm model
 * ======================================================= */

export const CharmTypeSchema = z.enum(["major", "minor"]);
export type CharmType = z.infer<typeof CharmTypeSchema>;

export const CharmLevelSchema = z.number().int().min(1).max(CHARM_MAX_LEVEL);
export const CharmLevelOrZeroSchema = z.number().int().min(0).max(CHARM_MAX_LEVEL);

export const CharmLevelDataSchema = z.object({
  cost: z.number().int().positive(),
  effect: NonEmptyString,
});

export const CharmLevelsSchema = z.object({
  1: CharmLevelDataSchema,
  2: CharmLevelDataSchema,
  3: CharmLevelDataSchema,
});
export type CharmLevel = z.infer<typeof CharmLevelSchema>;

export const CharmSchema = z.object({
  id: UUID,
  name: NonEmptyString,
  type: CharmTypeSchema,
  description: NonEmptyString,
  levels: CharmLevelsSchema,
  image_path: NonEmptyString,
});
export type Charm = z.infer<typeof CharmSchema>;

/* =========================================================
 * Progress
 * ======================================================= */

export const CharmProgressSchema = z.object({
  unlocked: z.boolean(),
  level: CharmLevelOrZeroSchema,
  unlocked_at: z.string().nullable(),
});
export type CharmProgress = z.infer<typeof CharmProgressSchema>;

export const CharmWithProgressSchema = CharmSchema.extend({
  progress: CharmProgressSchema,
});
export type CharmWithProgress = z.infer<typeof CharmWithProgressSchema>;
