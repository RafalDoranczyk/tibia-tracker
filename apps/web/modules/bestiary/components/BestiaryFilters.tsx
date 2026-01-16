"use client";

import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";

import { DebouncedSearchFieldURL } from "@/components";
import { usePaginationQueryParams } from "@/hooks";

import { BESTIARY_CLASSES, DEFAULT_BESTIARY_CLASS } from "../constants";
import type { BestiaryClass } from "../types";

const DEBOUNCE_MS = 250;

type BestiaryFiltersType = {
  bestiary_class?: BestiaryClass;
  search?: string;
};

export function BestiaryFilters() {
  const { filters, updateFilter } = usePaginationQueryParams<BestiaryFiltersType>();

  const handleClassChange = (value: BestiaryClass) => {
    updateFilter({
      bestiary_class: value,
      search: undefined,
      page: 1,
    });
  };

  const handleSearchChange = (val: string) => {
    updateFilter({
      search: val || undefined,
      bestiary_class: val ? undefined : filters.bestiary_class,
      page: 1,
    });
  };

  const handleClearFilters = () => {
    updateFilter({
      bestiary_class: undefined,
      search: undefined,
      page: 1,
    });
  };

  const isClearDisabled = !filters.search && filters.bestiary_class === undefined;
  const isSearching = Boolean(filters.search);
  const selectedClass = filters.bestiary_class ?? DEFAULT_BESTIARY_CLASS;

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems={{ xs: "stretch", sm: "center" }}
    >
      <FormControl size="small" sx={{ minWidth: 200 }} disabled={isSearching}>
        <InputLabel id="bestiary-class-label">
          {isSearching ? "Searching across all classes" : "Bestiary Class"}
        </InputLabel>
        <Select
          onChange={(e) => handleClassChange(e.target.value)}
          value={selectedClass}
          label="Bestiary Class"
        >
          {BESTIARY_CLASSES.map((el) => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DebouncedSearchFieldURL
        value={filters.search || ""}
        onChange={handleSearchChange}
        debounceMs={DEBOUNCE_MS}
        placeholder="Search monster..."
      />

      <Button
        variant="outlined"
        size="small"
        onClick={handleClearFilters}
        disabled={isClearDisabled}
      >
        🧹 Clear
      </Button>
    </Stack>
  );
}
