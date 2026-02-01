import { z } from "zod";

import { PaginationSchema } from "@/lib/pagination";

import { BESTIARY_CLASSES } from "../constants";

export const BestiaryClassSchema = z.enum(BESTIARY_CLASSES);

export type BestiaryClass = z.infer<typeof BestiaryClassSchema>;

export const BestiaryFiltersSchema = PaginationSchema.extend({
  bestiary_class: BestiaryClassSchema.optional(),
});
export type BestiaryFilters = z.infer<typeof BestiaryFiltersSchema>;
