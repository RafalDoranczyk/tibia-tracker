import { z } from "zod";

import { NonEmptyString, PositiveInt } from "@/lib/zod";

import { CHARM_LEVELS, type CharmLevel, CharmLevelSchema, CharmSchema } from "../db/charm.schema";

const CharmLevelValuesSchema = z.object({
  cost: PositiveInt,
  effect: NonEmptyString,
});

const CharmLevelsSchema = z.object(
  Object.fromEntries(CHARM_LEVELS.map((lvl) => [lvl, CharmLevelValuesSchema])) as Record<
    CharmLevel,
    typeof CharmLevelValuesSchema
  >
);

/**
 * UI-only charm view model
 * Used for displaying charm levels, costs and effects in the app
 */

const CharmViewModelSchema = CharmSchema.pick({
  id: true,
  name: true,
  type: true,
  description: true,
  image_path: true,
}).extend({
  levels: CharmLevelsSchema,
});
export type CharmViewModel = z.infer<typeof CharmViewModelSchema>;

/**
 * UI-only model combining charm definition with character progress
 */

const CharmProgressLevelSchema = z.union([z.literal(0), CharmLevelSchema]);

export const CharacterCharmWithProgressSchema = CharmViewModelSchema.extend({
  progress: z.object({
    unlocked: z.boolean(),
    level: CharmProgressLevelSchema,
  }),
});
export type CharacterCharmWithProgress = z.infer<typeof CharacterCharmWithProgressSchema>;
