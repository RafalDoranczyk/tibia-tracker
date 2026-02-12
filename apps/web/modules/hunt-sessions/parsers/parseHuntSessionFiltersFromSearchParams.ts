import { parseJsonQuery } from "@/lib/url";

import { HunttSessionFiltersSchema } from "../schemas";

const FILTER_TOKEN = "filters";

type SearchParams = Record<string, string | string[] | undefined>;

export function parseHuntSessionFiltersFromSearchParams(searchParams?: SearchParams) {
  if (!searchParams) {
    return HunttSessionFiltersSchema.parse({});
  }

  const raw = searchParams[FILTER_TOKEN];
  if (typeof raw !== "string") {
    return HunttSessionFiltersSchema.parse({});
  }

  const parsed = parseJsonQuery(raw);
  return HunttSessionFiltersSchema.parse(parsed ?? {});
}
