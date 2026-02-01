import { fetchCharacterBestiaryClassSummary } from "../actions/fetchCharacterBestiaryClassSummary";
import { fetchCharacterBestiaryFull } from "../actions/fetchCharacterBestiaryFull";
import { fetchCharacterBestiarySummary } from "../actions/fetchCharacterBestiarySummary";
import { DEFAULT_BESTIARY_CLASS } from "../constants";
import type { BestiaryFilters } from "../schemas";

export async function loadCharacterBestiary({
  characterId,
  filters,
}: {
  characterId: string;
  filters: BestiaryFilters;
}) {
  const shouldIgnoreClassFilter = !!filters.search?.trim();

  const bestiaryClass = shouldIgnoreClassFilter
    ? undefined
    : (filters.bestiary_class ?? DEFAULT_BESTIARY_CLASS);

  const [bestiaryFull, summary, classSummary] = await Promise.all([
    fetchCharacterBestiaryFull({
      characterId,
      bestiaryClass,
      ...filters,
    }),
    fetchCharacterBestiarySummary(characterId),
    bestiaryClass ? fetchCharacterBestiaryClassSummary(characterId, bestiaryClass) : null,
  ]);

  return {
    ...bestiaryFull,
    summary,
    classSummary,
  };
}
