import { parseJsonQuery } from "@/lib/url";

import { BestiaryFiltersSchema } from "../schemas";

const FILTER_TOKEN = "filters";

type SearchParams = Record<string, string | string[] | undefined>;

export function parseBestiaryFilters(searchParams?: SearchParams) {
  const base = {};

  if (!searchParams) {
    return BestiaryFiltersSchema.parse(base);
  }

  const raw = searchParams[FILTER_TOKEN];
  if (!raw || typeof raw !== "string") {
    return BestiaryFiltersSchema.parse(base);
  }

  const parsed = parseJsonQuery(raw);
  if (!parsed) {
    return BestiaryFiltersSchema.parse(base);
  }

  return BestiaryFiltersSchema.parse({
    ...base,
    ...parsed,
  });
}
