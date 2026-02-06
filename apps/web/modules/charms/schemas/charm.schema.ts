import { z } from "zod";

import { NonEmptyString, PositiveInt, UUID } from "@/schemas";

/* =========================================================
 * Core charm model
 * ======================================================= */

export const CharmTypeSchema = z.enum(["major", "minor"]);
export type CharmType = z.infer<typeof CharmTypeSchema>;

export const CharmSchema = z.object({
  // Charm ID is a UUID in supabase db
  id: UUID,
  name: NonEmptyString,
  type: CharmTypeSchema,
  description: NonEmptyString,
  cost_lvl1: PositiveInt,
  effect_lvl1: NonEmptyString,
  cost_lvl2: PositiveInt,
  effect_lvl2: NonEmptyString,
  cost_lvl3: PositiveInt,
  effect_lvl3: NonEmptyString,
  image_path: NonEmptyString,
});
export type Charm = z.infer<typeof CharmSchema>;
