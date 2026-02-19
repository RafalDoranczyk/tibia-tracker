"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import { DebouncedSearchFieldURL } from "@/components";
import { BESTIARY_CLASSES, BESTIARY_DIFFICULTIES } from "@/modules/monsters";
import { useBestiaryFilters } from "../hooks/useBestiaryFilters";
import {
  BESTIARY_DIFFICULTY_LABELS,
  BESTIARY_STAGE_FILTER_LABELS,
  BESTIARY_STAGE_FILTER_VALUES,
} from "../schemas";

const DEBOUNCE_MS = 1000;

export function BestiaryFiltersPanel() {
  const { filters, isPending, isClearDisabled, actions } = useBestiaryFilters();

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      {isPending && <LinearProgress />}

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="subtitle1" fontWeight={600}>
          Filters
        </Typography>

        <Button
          onClick={actions.clear}
          disabled={isClearDisabled || isPending}
          size="small"
          color="inherit"
        >
          🧹 Clear filters
        </Button>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        {/* CLASS */}
        <FormControl size="small" sx={{ minWidth: 200 }} disabled={isPending}>
          <InputLabel id="bestiary-class-label">Class</InputLabel>

          <Select
            labelId="bestiary-class-label"
            label="Class"
            value={filters.bestiaryClass}
            onChange={(e) => actions.setClass(e.target.value)}
            MenuProps={{
              PaperProps: { sx: { maxHeight: 300 } },
            }}
          >
            <MenuItem value="all">All classes</MenuItem>

            {BESTIARY_CLASSES.map((el) => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* DIFFICULTY */}
        <FormControl size="small" sx={{ minWidth: 180 }} disabled={isPending}>
          <InputLabel id="bestiary-difficulty-label">Difficulty</InputLabel>

          <Select
            labelId="bestiary-difficulty-label"
            label="Difficulty"
            value={filters.bestiaryDifficulty}
            onChange={(e) => actions.setDifficulty(e.target.value)}
          >
            <MenuItem value="all">All difficulties</MenuItem>

            {BESTIARY_DIFFICULTIES.map((el) => (
              <MenuItem key={el} value={el}>
                {BESTIARY_DIFFICULTY_LABELS[el]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* STAGE */}
        <FormControl size="small" sx={{ minWidth: 180 }} disabled={isPending}>
          <InputLabel id="bestiary-stage-label">Progress</InputLabel>

          <Select
            labelId="bestiary-stage-label"
            label="Progress"
            value={filters.stage}
            onChange={(e) => actions.setStageFilter(e.target.value)}
            renderValue={(value) => BESTIARY_STAGE_FILTER_LABELS[value]}
          >
            {BESTIARY_STAGE_FILTER_VALUES.map((el) => (
              <MenuItem key={el} value={el}>
                {BESTIARY_STAGE_FILTER_LABELS[el]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* SEARCH */}
        <DebouncedSearchFieldURL
          value={filters.search || ""}
          onChange={actions.setSearch}
          debounceMs={DEBOUNCE_MS}
          placeholder="Search monster..."
          disabled={isPending}
        />
      </Stack>
    </Box>
  );
}
