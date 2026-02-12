import { z } from "zod";

const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(15),
});

export const HunttSessionFiltersSchema = PaginationSchema.extend({
  search: z.string().min(1).optional(),
});
export type HuntSessionFilters = z.infer<typeof HunttSessionFiltersSchema>;
