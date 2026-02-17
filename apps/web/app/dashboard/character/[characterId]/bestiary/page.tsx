import { Grid } from "@mui/material";
import type { Metadata } from "next";
import { PageHeader } from "@/layout/page/PageHeader";
import {
  BestiaryCardGrid,
  BestiaryFiltersPanel,
  BestiaryPagination,
  BestiarySummaryPanel,
  parseBestiaryFiltersFromSearchParams,
} from "@/modules/bestiary";
import {
  getCharacterBestiaryClassSummary,
  getCharacterBestiarySummary,
  getMonsterListWithProgress,
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

  return (
    <>
      <PageHeader
        title="Bestiary"
        description="Explore the collection of monsters encountered by your character."
        action={<BestiarySummaryPanel globalSummary={summary} classSummary={classSummary} />}
      />
      <Grid container spacing={4} direction="column">
        <BestiaryFiltersPanel />
        <BestiaryCardGrid monstersWithProgress={bestiary.monstersWithProgress} />
        <BestiaryPagination totalPages={bestiary.totalPages} />
      </Grid>
    </>
  );
}
