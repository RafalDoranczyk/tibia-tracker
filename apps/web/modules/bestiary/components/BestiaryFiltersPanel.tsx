"use client";

import ClearAllIcon from "@mui/icons-material/ClearAll";
import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  type Theme,
  Typography,
} from "@mui/material";
import { MONSTER_CLASSES, MONSTER_DIFFICULTIES } from "@repo/database/monsters";
import { DebouncedSearchFieldURL } from "@/components";
import { usePaginationQueryParams } from "@/hooks/usePaginationQueryParams";
import { useBestiaryFilters } from "../hooks/useBestiaryFilters";
import { BESTIARY_STAGE_FILTER_LABELS, BESTIARY_STAGE_FILTER_VALUES } from "../schemas";

const DEBOUNCE_MS = 900;

const getActiveSelectStyles = (isActive: boolean) => ({
  ...(isActive && {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "secondary.main",
      borderWidth: "2px",
    },
    "& .MuiInputLabel-root": {
      color: "secondary.main",
      fontWeight: "bold",
    },
    backgroundColor: (t: Theme) => alpha(t.palette.secondary.main, 0.05),
  }),
});

type BestiaryFiltersPanelProps = {
  totalPages: number;
  progress: number;
};

export function BestiaryFiltersPanel({ totalPages, progress }: BestiaryFiltersPanelProps) {
  const { filters, isPending, isClearDisabled, actions } = useBestiaryFilters();
  const { page, updatePage } = usePaginationQueryParams();

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top Progress Bar - Integral part of the header */}
      <Box sx={{ position: "relative" }}>
        <LinearProgress color="success" variant="determinate" value={progress} sx={{ height: 6 }} />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            right: 12,
            top: 10,
            fontSize: "0.65rem",
            fontWeight: 800,
            color: "text.secondary",
            textTransform: "uppercase",
          }}
        >
          Total Progress: {progress}%
        </Typography>
      </Box>

      <Box sx={{ p: 2.5 }}>
        <Stack spacing={2.5}>
          {/* Header Row */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                textTransform: "uppercase",
                letterSpacing: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <SearchIcon fontSize="small" color="secondary" />
              Bestiary Explorer
            </Typography>
          </Stack>

          {/* Filters Row */}
          <Grid
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            alignItems="center"
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                xl: "1fr 1fr 1fr 1fr 1fr auto",
                xxl: "140px 140px 140px 300px 90px auto",
              },
              gap: 1.5,
              width: "100%",
            }}
          >
            {/* CLASS */}
            <FormControl size="small" fullWidth disabled={isPending}>
              <InputLabel>Class</InputLabel>
              <Select
                MenuProps={{
                  slotProps: {
                    paper: {
                      sx: {
                        maxHeight: 400,
                      },
                    },
                  },
                }}
                label="Class"
                value={filters.bestiaryClass}
                onChange={(e) => actions.setClass(e.target.value)}
                slotProps={{
                  root: { sx: { maxHeight: 200 } },
                }}
                sx={getActiveSelectStyles(filters.bestiaryClass !== "all")}
              >
                <MenuItem value="all">All Classes</MenuItem>
                {MONSTER_CLASSES.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* DIFFICULTY */}
            <FormControl size="small" fullWidth disabled={isPending}>
              <InputLabel>Difficulty</InputLabel>
              <Select
                label="Difficulty"
                value={filters.bestiaryDifficulty}
                onChange={(e) => actions.setDifficulty(e.target.value)}
                sx={getActiveSelectStyles(filters.bestiaryDifficulty !== "all")}
              >
                <MenuItem value="all">All Difficulties</MenuItem>
                {MONSTER_DIFFICULTIES.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* STAGE */}
            <FormControl size="small" fullWidth disabled={isPending}>
              <InputLabel>Progress</InputLabel>
              <Select
                label="Progress"
                value={filters.stage}
                onChange={(e) => actions.setStageFilter(e.target.value)}
                renderValue={(value) => BESTIARY_STAGE_FILTER_LABELS[value]}
                sx={getActiveSelectStyles(filters.stage !== "all")}
              >
                {BESTIARY_STAGE_FILTER_VALUES.map((el) => (
                  <MenuItem key={el} value={el}>
                    {BESTIARY_STAGE_FILTER_LABELS[el]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ maxWidth: { xl: 500 } }}>
              <DebouncedSearchFieldURL
                value={filters.search || ""}
                onChange={actions.setSearch}
                debounceMs={DEBOUNCE_MS}
                placeholder="Find monster..."
                disabled={isPending}
              />
            </Box>

            {/* RESET BUTTON */}
            <Button
              onClick={actions.clear}
              disabled={isPending || isClearDisabled}
              size="small"
              variant="outlined"
              color="secondary"
              startIcon={<ClearAllIcon />}
              sx={{
                fontWeight: 700,
                whiteSpace: "nowrap",
                height: "40px",
                borderRadius: "8px",
                px: 2,
                "&:hover": { bgcolor: (t) => alpha(t.palette.secondary.main, 0.1) },
              }}
            >
              Reset
            </Button>

            {totalPages > 0 && (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Pagination
                  color="secondary"
                  variant="outlined"
                  shape="rounded"
                  count={totalPages}
                  page={page}
                  onChange={(_, newPage) => updatePage(newPage)}
                  hideNextButton
                  hidePrevButton
                />
              </Box>
            )}
          </Grid>
        </Stack>
      </Box>

      {/* Subtle Loading Overlay at the very bottom of the Paper */}
      <LinearProgress
        sx={{
          opacity: isPending ? 1 : 0,
          height: 2,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        variant="indeterminate"
        color="secondary"
      />
    </Paper>
  );
}
