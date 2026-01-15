"use client";

import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";

import { DebouncedSearchFieldURL } from "@/components";
import { usePaginationQueryParams } from "@/hooks";

import { BESTIARY_CLASSES, type BestiaryClass } from "../schemas";

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

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems={{ xs: "stretch", sm: "center" }}
    >
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="bestiary-class-label">Bestiary Class</InputLabel>
        <Select
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 300,
              },
            },
          }}
          labelId="bestiary-class-label"
          label="Bestiary Class"
          value={filters.bestiary_class || ""}
          onChange={(e) => handleClassChange(e.target.value)}
        >
          {BESTIARY_CLASSES.map((el) => (
            <MenuItem value={el} key={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DebouncedSearchFieldURL
        value={filters.search || ""}
        onChange={handleSearchChange}
        debounceMs={400}
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
