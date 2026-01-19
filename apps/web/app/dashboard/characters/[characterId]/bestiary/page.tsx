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
  console.log(search);
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
