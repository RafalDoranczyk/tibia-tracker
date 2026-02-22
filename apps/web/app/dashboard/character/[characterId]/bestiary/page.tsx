import { Box, Stack } from "@mui/material";
import type { Metadata } from "next";
import { EmptyState } from "@/components";
import {
  BestiaryFiltersPanel,
  BestiarySummaryPanel,
  BestiaryView,
  parseBestiaryFiltersFromSearchParams,
} from "@/modules/bestiary";
import {
  getCharacterBestiaryClassSummary,
  getCharacterBestiarySummary,
  getMonsterListWithProgress,
} from "@/modules/bestiary/server";
import { APP_BAR_HEIGHT } from "@/modules/navigation";
import type { CharacterPageProps } from "../../../types";

export const metadata: Metadata = {
  title: "Bestiary",
  description: "Explore the collection of monsters encountered by your character.",
};

export default async function CharacterBestiaryPage({ params, searchParams }: CharacterPageProps) {
  const [{ characterId }, search] = await Promise.all([params, searchParams]);

  const filters = parseBestiaryFiltersFromSearchParams(search);

  const classSummaryPromise = filters.bestiaryClass
    ? getCharacterBestiaryClassSummary({ characterId, bestiaryClass: filters.bestiaryClass })
    : null;

  const [bestiary, summary, classSummary] = await Promise.all([
    getMonsterListWithProgress({
      characterId,
      filters,
    }),
    getCharacterBestiarySummary(characterId),
    classSummaryPromise,
  ]);
  console.log(summary);
  const progress =
    Math.round(Math.min((summary.unlocked_charm_points / summary.total_charm_points) * 100, 100)) ||
    0;

  return (
    <Stack
      direction={{ xs: "column-reverse", lg: "row" }}
      spacing={4}
      alignItems="flex-start"
      sx={{ mt: 2 }}
    >
      <Box sx={{ flex: 1, width: "100%", minWidth: 0 }}>
        <Stack spacing={4}>
          <BestiaryFiltersPanel totalPages={bestiary.totalPages} progress={progress} />

          {bestiary.monstersWithProgress.length === 0 ? (
            <EmptyState variant="monsters" title="No monsters found with the selected filters." />
          ) : (
            <BestiaryView bestiary={bestiary} />
          )}
        </Stack>
      </Box>

      <Box
        component="aside"
        sx={{
          width: { xs: "100%", lg: 320 },
          flexShrink: 0,
          position: { lg: "sticky" },
          top: { lg: `calc(${APP_BAR_HEIGHT} + 16px)` },
        }}
      >
        <BestiarySummaryPanel classSummary={classSummary} globalSummary={summary} />
      </Box>
    </Stack>
  );
}
