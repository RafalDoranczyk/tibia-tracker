import { parseJsonQuery } from "@/lib/url";

import { HUNT_SESSION_PAGINATION_LIMIT } from "../constants";
import { HuntSessionListFiltersSchema } from "../schemas";

const FILTER_TOKEN = "filters";

type SearchParams = Record<string, string | string[] | undefined>;

export function parseHuntSessionFilters(searchParams?: SearchParams) {
  const base = HuntSessionListFiltersSchema.parse({
    limit: HUNT_SESSION_PAGINATION_LIMIT,
    page: 1,
  });

  if (!searchParams) return base;

  const raw = searchParams[FILTER_TOKEN];

  if (!raw || typeof raw !== "string") {
    return base;
  }

  const parsed = parseJsonQuery(raw);

  if (!parsed) return base;

  const result = HuntSessionListFiltersSchema.safeParse({
    ...base,
    ...parsed,
  });

  return result.success ? result.data : base;
}
