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

  const effectiveBestiaryClass: BestiaryClass = bestiaryClass || DEFAULT_BESTIARY_CLASS;

  const [bestiaryFull, summary, classSummary] = await Promise.all([
    fetchCharacterBestiaryFull({
      characterId,
      bestiaryClass: effectiveBestiaryClass,
      ...restFilters,
    }),
    fetchCharacterBestiarySummary(characterId),
    fetchCharacterBestiaryClassSummary(characterId, effectiveBestiaryClass),
  ]);

  const { monsters, totalPages } = bestiaryFull;

  return (
    <Grid container spacing={5} direction="column">
      <BestiaryFilters />
      <MonsterCardsGrid monsters={monsters} />
      <BestiaryPagination totalPages={totalPages} />
      <BestiaryFloatingPanel
        globalSummary={summary}
        classSummary={classSummary}
        hasSearch={!!restFilters.search}
      />
    </Grid>
  );
}
