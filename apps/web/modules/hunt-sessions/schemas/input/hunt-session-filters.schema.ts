import { z } from "zod";

export const HUNT_SESSION_DEFAULT_LIMIT = 10;

const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(HUNT_SESSION_DEFAULT_LIMIT),
});

export const HuntSessionFiltersSchema = PaginationSchema.extend({
  sortBy: z.string().optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});
export type HuntSessionFilters = z.infer<typeof HuntSessionFiltersSchema>;
