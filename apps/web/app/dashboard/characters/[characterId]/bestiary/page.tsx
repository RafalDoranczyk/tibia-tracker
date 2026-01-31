import { Grid } from "@mui/material";
import type { Metadata } from "next";

import { PageHeader } from "@/layout/page";
import {
  BestiaryFilterBar,
  BestiaryFloatingPanel,
  BestiaryPagination,
  loadCharacterBestiary,
  MonsterCardGrid,
  parseBestiaryFilters,
} from "@/modules/bestiary";

import type { CharacterPageProps } from "../../../types";

export const metadata: Metadata = {
  title: "Bestiary",
  description: "Explore the collection of monsters encountered by your character.",
};

export default async function CharacterBestiaryPage({ params, searchParams }: CharacterPageProps) {
  const { characterId } = await params;
  const search = await searchParams;

  const filters = parseBestiaryFilters(search);

  const { monsters, totalPages, summary, classSummary } = await loadCharacterBestiary({
    characterId,
    filters,
  });

  return (
    <>
      <PageHeader
        title="Bestiary"
        description="Explore the collection of monsters encountered by your character."
      />
      <Grid container spacing={4} direction="column">
        <BestiaryFilterBar />
        <MonsterCardGrid monsters={monsters} />
        <BestiaryPagination totalPages={totalPages} />
        <BestiaryFloatingPanel globalSummary={summary} classSummary={classSummary} />
      </Grid>
    </>
  );
}
