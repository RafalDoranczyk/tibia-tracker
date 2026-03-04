import { NonEmptyString, PositiveInt, z } from "@repo/validation";
import type { Enums, Tables } from "../../types/db";

/** * Basic enum for charm categories.
 * Kept here because it describes the 'charms' table property.
 */
export const CharmTypeSchema = z.enum(["major", "minor"]) satisfies z.ZodType<Enums<"charm_type">>;
export type CharmType = z.infer<typeof CharmTypeSchema>;

/** * Public charms definition (static data in the game)
 */
export const CharmSchema = z.object({
  id: z.number(),
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
}) satisfies z.ZodType<Tables<"charms">>;

export type Charm = z.infer<typeof CharmSchema>;
