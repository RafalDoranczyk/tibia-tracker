import { parseJsonQuery } from "@/lib/url";
import { HuntSessionFiltersSchema } from "../schemas";

const FILTER_TOKEN = "filters";

type SearchParams = Record<string, string | string[] | undefined>;

export function parseHuntSessionFiltersFromSearchParams(searchParams?: SearchParams) {
  if (!searchParams) {
    return HuntSessionFiltersSchema.parse({});
  }

  const raw = searchParams[FILTER_TOKEN];
  if (typeof raw !== "string") {
    return HuntSessionFiltersSchema.parse({});
  }

  const parsed = parseJsonQuery(raw);
  return HuntSessionFiltersSchema.parse(parsed ?? {});
}
