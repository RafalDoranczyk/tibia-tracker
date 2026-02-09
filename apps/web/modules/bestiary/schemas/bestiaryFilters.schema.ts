import { z } from "zod";

import { PaginationSchema } from "@/lib/pagination";

import { BestiaryClassSchema, BestiaryDifficultySchema } from "./monster.schema";

export const BestiaryStageFilterSchema = z.enum(["all", "not_completed", "completed"]);
export type BestiaryStageFilter = z.infer<typeof BestiaryStageFilterSchema>;

export const BESTIARY_STAGE_FILTER_VALUES = BestiaryStageFilterSchema.options;

export const BestiaryFiltersSchema = PaginationSchema.extend({
  bestiaryClass: BestiaryClassSchema.optional(),
  bestiaryDifficulty: BestiaryDifficultySchema.optional(),
  stage: BestiaryStageFilterSchema.optional(),
  limit: z.number().min(1).max(100).default(15),
});

export type BestiaryFilters = z.infer<typeof BestiaryFiltersSchema>;
