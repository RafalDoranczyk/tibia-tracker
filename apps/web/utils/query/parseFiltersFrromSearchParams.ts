import { PAGINATION_INITIAL_FILTERS } from "@/constants";

type SearchParams = Record<string, string | string[] | undefined>;
type EmptyObject = Record<string, never>;

export function parseFiltersFromSearchParams<T extends object = EmptyObject>(
  searchParams: SearchParams | undefined,
  token = "filters"
): typeof PAGINATION_INITIAL_FILTERS & T {
  const base = PAGINATION_INITIAL_FILTERS;

  if (!searchParams) {
    return base as typeof PAGINATION_INITIAL_FILTERS & T;
  }

  const raw = searchParams[token];

  if (!raw || typeof raw !== "string") {
    return base as typeof PAGINATION_INITIAL_FILTERS & T;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    return {
      ...base,
      ...parsed,
    } as typeof PAGINATION_INITIAL_FILTERS & T;
  } catch {
    return base as typeof PAGINATION_INITIAL_FILTERS & T;
  }
}
