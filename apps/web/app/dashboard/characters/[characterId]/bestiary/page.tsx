import { Box, Grid } from "@mui/material";

import { EmptyState } from "@/components";
import {
  type BestiaryClass,
  BestiaryFilters,
  BestiaryFloatingPanel,
  BestiaryPagination,
  fetchCharacterBestiaryClassSummary,
  fetchCharacterBestiaryFull,
  fetchCharacterBestiarySummary,
  MonsterCard,
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

      {monsters.length ? (
        <Grid container spacing={2} mb={2}>
          {monsters.map((monster) => (
            <Grid key={monster.id} sx={{ display: "flex", justifyContent: "center" }}>
              <MonsterCard monster={monster} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display="flex" justifyContent="center" width="100%">
          <EmptyState title="No monsters found with the selected filters." />
        </Box>
      )}

      <BestiaryPagination totalPages={totalPages} />
      <BestiaryFloatingPanel globalSummary={summary} classSummary={classSummary ?? undefined} />
    </Grid>
  );
}
