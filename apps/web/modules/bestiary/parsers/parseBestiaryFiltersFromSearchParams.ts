import { parseJsonQuery } from "@/lib/url";

import { BestiaryFiltersSchema } from "../schemas";

const FILTER_TOKEN = "filters";

type SearchParams = Record<string, string | string[] | undefined>;

export function parseBestiaryFiltersFromSearchParams(searchParams?: SearchParams) {
  if (!searchParams) {
    return BestiaryFiltersSchema.parse({});
  }

  const raw = searchParams[FILTER_TOKEN];
  if (typeof raw !== "string") {
    return BestiaryFiltersSchema.parse({});
  }

  const parsed = parseJsonQuery(raw);
  return BestiaryFiltersSchema.parse(parsed ?? {});
}
