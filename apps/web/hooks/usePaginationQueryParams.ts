"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import * as R from "remeda";
import { useQueryParam } from "use-query-params";

import { PaginationSchema } from "@/lib/zod";

export function isEmpty<T extends object>(obj: T) {
  return R.values(obj).length === 0;
}

export const DEFAULT_PAGINATION = PaginationSchema.parse({});

export const DEFAULT_PARAM_TOKEN = "filters" as const;

export type SortDirection = "desc" | "asc";
export type SortPayload = {
  sortDirection?: SortDirection;
  sortBy?: string;
};

type JsonAllowedTypes =
  | { [key: string]: JsonAllowedTypes }
  | JsonAllowedTypes[]
  | boolean
  | string
  | number
  | Date
  | null;

const ReservedKeys = ["search", "page", "limit", "sortDirection", "sortBy"] as const;
type ReservedKeysType = (typeof ReservedKeys)[number];

type FiltersType = Record<string, JsonAllowedTypes>;
type AllowedExternalFilters<TData extends FiltersType> = Omit<TData, ReservedKeysType>;

export type FiltersValue<TData extends FiltersType> = typeof DEFAULT_PAGINATION &
  SortPayload &
  AllowedExternalFilters<TData>;

export type UsePaginationQueryParamsProps<TData extends FiltersType> = {
  defaultFilters?: Partial<FiltersValue<TData>>;
  token?: string;
};

export function usePaginationQueryParams<TData extends FiltersType>(
  params?: UsePaginationQueryParamsProps<TData>
) {
  const router = useRouter();

  const [json, setJson] = useQueryParam(params?.token || DEFAULT_PARAM_TOKEN, {
    decode: (val) => {
      if (R.isString(val)) {
        try {
          return JSON.parse(decodeURIComponent(val));
        } catch {
          return { ...DEFAULT_PAGINATION, ...params?.defaultFilters };
        }
      }
      return val ?? { ...DEFAULT_PAGINATION, ...params?.defaultFilters };
    },
    default: { ...DEFAULT_PAGINATION, ...params?.defaultFilters },
    encode: (val) => encodeURIComponent(JSON.stringify(val)),
    equals: R.isDeepEqual,
  });

  const updateFilter = useCallback(
    (newValue: Partial<typeof DEFAULT_PAGINATION & SortPayload> | Partial<FiltersValue<TData>>) => {
      setJson({
        ...json,
        ...newValue,
        page: DEFAULT_PAGINATION.page,
      });
    },
    [json, setJson]
  );

  const getActiveFiltersCount = useCallback(
    (omitted?: readonly (keyof AllowedExternalFilters<TData>)[]) => {
      const withoutOmitted = R.omit(json, [...ReservedKeys, ...(omitted ?? [])]);
      return Object.values(withoutOmitted).reduce<number>((acc, x) => {
        if (R.isNullish(x)) return acc;

        if (R.isArray(x)) {
          return !isEmpty(x) ? acc + 1 : acc;
        }

        if (R.isPlainObject(x) && "value" in x) {
          const val = x.value;
          return val && !isEmpty(val) ? acc + 1 : acc;
        }

        return acc + 1;
      }, 0);
    },
    [json]
  );

  const updatePage = useCallback(
    (newPage: number) => {
      const updated = { ...json, page: newPage };
      const encoded = encodeURIComponent(JSON.stringify(updated));
      router.push(`?${params?.token || DEFAULT_PARAM_TOKEN}=${encoded}`);
    },
    [json, router, params?.token]
  );

  const clearFilters = useCallback(() => {
    setJson({ ...DEFAULT_PAGINATION, ...params?.defaultFilters });
  }, [setJson, params?.defaultFilters]);

  const updateSort = useCallback((sort: SortPayload) => updateFilter(sort), [updateFilter]);

  return {
    filters: R.omit(json, ["page", "limit", "sortBy", "sortDirection"]),
    sortDirection: json.sortDirection,
    getActiveFiltersCount,
    sortBy: json.sortBy,
    limit: json.limit,
    page: json.page,
    updateFilter,
    clearFilters,
    updatePage,
    updateSort,
  };
}

export type UsePaginationQueryParamsReturn<TData extends FiltersType = Record<string, never>> =
  ReturnType<typeof usePaginationQueryParams<TData>>;
