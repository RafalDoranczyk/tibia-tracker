import { z } from "zod";

import { NonEmptyString, PositiveInt } from "@/schemas";

import { CHARM_MAX_LEVEL } from "../constants";
import { CharmSchema } from "./charm.schema";

// These schemas are used only in the app for view models, they are not used for API validation

const CharmLevelValuesSchema = z.object({
  cost: PositiveInt,
  effect: NonEmptyString,
});

// Create a schema for charm levels 1 to CHARM_MAX_LEVEL
const CharmLevelsSchema = z.object(
  Array.from({ length: CHARM_MAX_LEVEL }, (_, i) => i + 1).reduce(
    (acc, level) => {
      acc[level] = CharmLevelValuesSchema;
      return acc;
    },
    {} as Record<number, typeof CharmLevelValuesSchema>
  )
);

// We want to map the flat charm schema to a nested one for easier access in the app, especially for calculating costs and effects by level
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

const CharacterCharmWithProgressSchema = CharmViewModelSchema.extend({
  progress: z.object({
    unlocked: z.boolean(),
    level: z.number().int().min(0).max(CHARM_MAX_LEVEL),
  }),
});

export type CharacterCharmWithProgress = z.infer<typeof CharacterCharmWithProgressSchema>;
