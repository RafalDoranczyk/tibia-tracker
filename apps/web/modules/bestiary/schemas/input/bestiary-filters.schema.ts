import { BestiaryStageFilterSchema } from "@repo/database/character-bestiary";
import { MonsterClassSchema, MonsterDifficultySchema } from "@repo/database/monsters";
import { z } from "@repo/validation";

const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(15),
});

export const BestiaryFiltersSchema = PaginationSchema.extend({
  bestiaryClass: MonsterClassSchema.optional(),
  bestiaryDifficulty: MonsterDifficultySchema.optional(),
  stage: BestiaryStageFilterSchema.optional(),
  search: z.string().min(1).optional(),
});
export type BestiaryFilters = z.infer<typeof BestiaryFiltersSchema>;
