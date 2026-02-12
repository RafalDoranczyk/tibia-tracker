import { useTransition } from "react";

import { usePaginationQueryParams } from "@/hooks";

import type {
  BestiaryClass,
  BestiaryDifficulty,
  BestiaryFilters,
  BestiaryStageFilter,
} from "../schemas";

type BestiaryStageFilterOption = BestiaryStageFilter | "all";
type BestiaryClassOption = BestiaryClass | "all";
type BestiaryDifficultyOption = BestiaryDifficulty | "all";

const ALL = "all" as const;

export function useBestiaryFilters() {
  const { filters, updateFilter } = usePaginationQueryParams<BestiaryFilters>();
  const [isPending, startTransition] = useTransition();

  const uiFilters = {
    bestiaryClass: (filters.bestiaryClass ?? ALL) as BestiaryClassOption,
    bestiaryDifficulty: (filters.bestiaryDifficulty ?? ALL) as BestiaryDifficultyOption,
    stage: (filters.stage ?? ALL) as BestiaryStageFilterOption,
    search: filters.search ?? "",
    limit: filters.limit ?? 15,
    page: filters.page ?? 1,
  };

  // =========================
  // UI ACTIONS
  // =========================

  const patchFilters = (newFilters: Partial<BestiaryFilters>) => {
    startTransition(() => {
      updateFilter({
        ...newFilters,
        page: 1,
      });
    });
  };

  const setClass = (value: BestiaryClassOption) =>
    patchFilters({ bestiaryClass: value === ALL ? undefined : value });

  const setDifficulty = (value: BestiaryDifficultyOption) =>
    patchFilters({ bestiaryDifficulty: value === ALL ? undefined : value });

  const setStageFilter = (value: BestiaryStageFilterOption) =>
    patchFilters({ stage: value === ALL ? undefined : value });

  const setSearch = (value: string) => patchFilters({ search: value || undefined });

  const setLimit = (limit: number) => patchFilters({ limit });

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
    filters: uiFilters,
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
