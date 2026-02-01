import { parseJsonQuery } from "@/lib/url";

import { BestiaryFiltersSchema } from "../schemas";

const FILTER_TOKEN = "filters";

type SearchParams = Record<string, string | string[] | undefined>;

export function parseBestiaryFilters(searchParams?: SearchParams) {
  const base = BestiaryFiltersSchema.parse({});

  if (!searchParams) return base;

  const raw = searchParams[FILTER_TOKEN];

  if (!raw || typeof raw !== "string") {
    return base;
  }

  const parsed = parseJsonQuery(raw);

  if (!parsed) return base;

  const result = BestiaryFiltersSchema.safeParse({
    ...base,
    ...parsed,
  });

  return result.success ? result.data : base;
}
