"use client";

import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useRef, useTransition } from "react";

import { DebouncedSearchFieldURL } from "@/components";
import { usePaginationQueryParams } from "@/hooks";

import { BESTIARY_CLASSES, DEFAULT_BESTIARY_CLASS } from "../constants";
import type { BestiaryClass, BestiaryFilters } from "../schemas";

const DEBOUNCE_MS = 500;

export function BestiaryFilterBar() {
  const { filters, updateFilter } = usePaginationQueryParams<BestiaryFilters>();
  const lastBestiaryClassRef = useRef<BestiaryClass | undefined>(filters.bestiary_class);

  const [isPending, startTransition] = useTransition();

  const handleClassChange = (value: BestiaryClass) => {
    startTransition(() => {
      lastBestiaryClassRef.current = value;

      updateFilter({
        bestiary_class: value,
        search: undefined,
        page: 1,
      });
    });
  };

  const handleSearchChange = (val: string) => {
    startTransition(() => {
      updateFilter({
        search: val || undefined,
        page: 1,
      });
    });
  };

  const handleClearFilters = () => {
    startTransition(() => {
      lastBestiaryClassRef.current = DEFAULT_BESTIARY_CLASS;

      updateFilter({
        bestiary_class: undefined,
        search: undefined,
        page: 1,
      });
    });
  };

  const isClearDisabled = !filters.search && filters.bestiary_class === undefined;

  const isSearching = Boolean(filters.search);
  const selectedClass = filters.bestiary_class ?? DEFAULT_BESTIARY_CLASS;

  return (
    <>
      {isPending && <LinearProgress />}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        <FormControl size="small" sx={{ minWidth: 200 }} disabled={isPending || isSearching}>
          <InputLabel id="bestiary-class-label">
            {isSearching ? "Searching across all classes" : "Bestiary Class"}
          </InputLabel>

          <Select
            labelId="bestiary-class-label"
            label="Bestiary Class"
            value={selectedClass}
            onChange={(e) => handleClassChange(e.target.value as BestiaryClass)}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 300 },
              },
            }}
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
          disabled={isPending}
        />

        <Button
          variant="outlined"
          size="small"
          onClick={handleClearFilters}
          disabled={isClearDisabled || isPending}
        >
          🧹 Reset default
        </Button>
      </Stack>
    </>
  );
}
