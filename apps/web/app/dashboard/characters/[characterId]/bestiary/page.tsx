import { Grid } from "@mui/material";

import {
  type BestiaryClass,
  BestiaryFilters,
  BestiaryFloatingPanel,
  BestiaryPagination,
  fetchCharacterBestiaryClassSummary,
  fetchCharacterBestiaryFull,
  fetchCharacterBestiarySummary,
  MonsterCardsGrid,
} from "@/modules/bestiary";
import { parseFiltersFromSearchParams } from "@/utils";

type PageProps = {
  params: Promise<{ characterId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CharacterBestiaryPage({ params, searchParams }: PageProps) {
  const { characterId } = await params;
  const search = await searchParams;

  const { bestiary_class: bestiaryClass, ...restFilters } = parseFiltersFromSearchParams<{
    bestiary_class?: BestiaryClass;
  }>(search);

  const [bestiaryFull, summary, classSummary] = await Promise.all([
    fetchCharacterBestiaryFull({ characterId, ...restFilters, bestiaryClass }),
    fetchCharacterBestiarySummary(characterId),
    bestiaryClass ? fetchCharacterBestiaryClassSummary(characterId, bestiaryClass) : null,
  ]);

  const { monsters, totalPages } = bestiaryFull;

  return (
    <Grid container spacing={5} direction="column">
      <BestiaryFilters />
      <MonsterCardsGrid monsters={monsters} />
      <BestiaryPagination totalPages={totalPages} />
      <BestiaryFloatingPanel globalSummary={summary} classSummary={classSummary ?? undefined} />
    </Grid>
  );
}
