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
import { DEFAULT_BESTIARY_CLASS } from "@/modules/bestiary/constants";
import { parseFiltersFromSearchParams } from "@/utils";

import type { CharacterPageProps } from "../../types";

export default async function CharacterBestiaryPage({ params, searchParams }: CharacterPageProps) {
  const { characterId } = await params;
  const search = await searchParams;

  const { bestiary_class: bestiaryClass, ...restFilters } = parseFiltersFromSearchParams<{
    bestiary_class?: BestiaryClass;
  }>(search);

  const hasSearch = Boolean(restFilters.search?.trim());

  // If there is a search term, ignore the bestiary class filter
  const effectiveBestiaryClass: BestiaryClass | undefined = hasSearch
    ? undefined
    : bestiaryClass || DEFAULT_BESTIARY_CLASS;

  const [bestiaryFull, summary, classSummary] = await Promise.all([
    fetchCharacterBestiaryFull({
      characterId,
      bestiaryClass: effectiveBestiaryClass,
      ...restFilters,
    }),
    fetchCharacterBestiarySummary(characterId),
    effectiveBestiaryClass
      ? fetchCharacterBestiaryClassSummary(characterId, effectiveBestiaryClass)
      : Promise.resolve(null),
  ]);

  const { monsters, totalPages } = bestiaryFull;

  return (
    <Grid container spacing={4} direction="column">
      <BestiaryFilters />
      <MonsterCardsGrid monsters={monsters} />
      <BestiaryPagination totalPages={totalPages} />
      <BestiaryFloatingPanel globalSummary={summary} classSummary={classSummary} />
    </Grid>
  );
}
