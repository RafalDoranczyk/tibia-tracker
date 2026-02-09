import { z } from "zod";

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(5).max(100).optional(),
  sortBy: z.string().optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),

  search: z.coerce
    .string()
    .trim()
    .transform((v) => (v ? v : undefined))
    .optional(),
});
