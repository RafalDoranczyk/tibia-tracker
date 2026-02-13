import { Grid } from "@mui/material";
import type { Metadata } from "next";

import { PageHeader } from "@/layout/page";
import {
  BestiaryFiltersPanel,
  BestiaryFloatingPanel,
  BestiaryPagination,
  BestiaryView,
  parseBestiaryFiltersFromSearchParams,
} from "@/modules/bestiary";
import {
  fetchCharacterBestiaryClassSummary,
  fetchCharacterBestiarySummary,
  fetchMonstersWithProgress,
} from "@/modules/bestiary/server";

import type { CharacterPageProps } from "../../../types";

export const metadata: Metadata = {
  title: "Bestiary",
  description: "Explore the collection of monsters encountered by your character.",
};

export default async function CharacterBestiaryPage({ params, searchParams }: CharacterPageProps) {
  const [{ characterId }, search] = await Promise.all([params, searchParams]);

  const filters = parseBestiaryFiltersFromSearchParams(search);

  const classSummaryPromise = filters.bestiaryClass
    ? fetchCharacterBestiaryClassSummary({ characterId, bestiaryClass: filters.bestiaryClass })
    : null;

  const [bestiary, summary, classSummary] = await Promise.all([
    fetchMonstersWithProgress({
      characterId,
      filters,
    }),
    fetchCharacterBestiarySummary(characterId),
    classSummaryPromise,
  ]);

  return (
    <>
      <PageHeader
        title="Bestiary"
        description="Explore the collection of monsters encountered by your character."
      />
      <Grid container spacing={4} direction="column">
        <BestiaryFiltersPanel />
        <BestiaryView monstersWithProgress={bestiary.monstersWithProgress} />
        <BestiaryPagination totalPages={bestiary.totalPages} />
        <BestiaryFloatingPanel globalSummary={summary} classSummary={classSummary} />
      </Grid>
    </>
  );
}
