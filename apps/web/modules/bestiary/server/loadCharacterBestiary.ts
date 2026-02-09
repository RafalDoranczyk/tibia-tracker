import { fetchCharacterBestiary } from "../actions/fetchCharacterBestiary";
import { fetchCharacterBestiaryClassSummary } from "../actions/fetchCharacterBestiaryClassSummary";
import { fetchCharacterBestiarySummary } from "../actions/fetchCharacterBestiarySummary";
import type { BestiaryFilters } from "../schemas";

type LoadCharacterBestiaryParams = {
  characterId: string;
  filters: BestiaryFilters;
};

export async function loadCharacterBestiary({ characterId, filters }: LoadCharacterBestiaryParams) {
  const [bestiary, summary, classSummary] = await Promise.all([
    fetchCharacterBestiary({
      characterId,
      filters,
    }),
    fetchCharacterBestiarySummary(characterId),
    filters.bestiaryClass
      ? fetchCharacterBestiaryClassSummary(characterId, filters.bestiaryClass)
      : Promise.resolve(null),
  ]);

  return {
    monstersWithProgress: bestiary.monstersWithProgress,
    totalCount: bestiary.totalCount,
    totalPages: bestiary.totalPages,
    summary: summary.data,
    summaryCacheTag: summary.cacheTag,
    classSummary: classSummary?.data ?? null,
    classSummaryCacheTag: classSummary?.cacheTag ?? null,
  };
}
