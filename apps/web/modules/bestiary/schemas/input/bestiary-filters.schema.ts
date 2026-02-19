import { z } from "zod";
import type { Enums } from "@/core/supabase/types";
import { BestiaryClassSchema, BestiaryDifficultySchema } from "@/modules/monsters";

const BestiaryStageFilterSchema = z.enum(["not_completed", "completed"]) satisfies z.ZodType<
  Enums<"bestiary_stage_filter">
>;
export type BestiaryStageFilter = z.infer<typeof BestiaryStageFilterSchema>;

const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(15),
});

export const BestiaryFiltersSchema = PaginationSchema.extend({
  bestiaryClass: BestiaryClassSchema.optional(),
  bestiaryDifficulty: BestiaryDifficultySchema.optional(),
  stage: BestiaryStageFilterSchema.optional(),
  search: z.string().min(1).optional(),
});
export type BestiaryFilters = z.infer<typeof BestiaryFiltersSchema>;
