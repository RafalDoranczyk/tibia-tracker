import { useTransition } from "react";

import { usePaginationQueryParams } from "@/hooks";

import type {
  BestiaryClass,
  BestiaryDifficulty,
  BestiaryFilters,
  BestiaryStageFilter,
} from "../schemas";

const ALL = "all" as const;
type All = typeof ALL;

type UIFilters = {
  bestiaryClass: BestiaryClass | All;
  bestiaryDifficulty: BestiaryDifficulty | All;
  stage: BestiaryStageFilter | All;
  search?: string;
  limit: number;
};

export function useBestiaryFilters() {
  const { filters, updateFilter } = usePaginationQueryParams<BestiaryFilters>();
  const [isPending, startTransition] = useTransition();

  // =========================
  // UI VALUES (no undefined)
  // =========================
  const uiFilters: UIFilters = {
    bestiaryClass: filters.bestiaryClass ?? ALL,
    bestiaryDifficulty: filters.bestiaryDifficulty ?? ALL,
    stage: filters.stage ?? ALL,
    search: filters.search,
    limit: filters.limit,
  };

  // =========================
  // UI ACTIONS
  // =========================
  const setClass = (value: BestiaryClass | All) => {
    startTransition(() => {
      updateFilter({
        bestiaryClass: value === ALL ? undefined : value,
        page: 1,
      });
    });
  };

  const setDifficulty = (value: BestiaryDifficulty | All) => {
    startTransition(() => {
      updateFilter({
        bestiaryDifficulty: value === ALL ? undefined : value,
        page: 1,
      });
    });
  };

  const setStageFilter = (value: BestiaryStageFilter | All) => {
    startTransition(() => {
      updateFilter({
        stage: value === ALL ? undefined : value,
        page: 1,
      });
    });
  };

  const setSearch = (value: string) => {
    startTransition(() => {
      updateFilter({
        search: value || undefined,
        page: 1,
      });
    });
  };

  const setLimit = (limit: number) => {
    startTransition(() => {
      updateFilter({
        limit,
        page: 1,
      });
    });
  };

  const clear = () => {
    startTransition(() => {
      updateFilter({
        bestiaryClass: undefined,
        bestiaryDifficulty: undefined,
        stage: undefined,
        search: undefined,
        page: 1,
      });
    });
  };

  const isClearDisabled =
    !filters.search &&
    filters.bestiaryClass === undefined &&
    filters.bestiaryDifficulty === undefined &&
    filters.stage === undefined;

  return {
    filters: uiFilters, // UI-safe
    isPending,
    isClearDisabled,
    actions: {
      setClass,
      setDifficulty,
      setStageFilter,
      setSearch,
      setLimit,
      clear,
    },
  };
}
