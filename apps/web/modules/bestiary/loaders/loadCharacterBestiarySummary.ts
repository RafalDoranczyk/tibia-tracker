import { cache } from "react";

import { fetchCharacterBestiarySummary } from "../actions/fetch-character-bestiary-summary.action";

export const loadCharacterBestiarySummary = cache((characterId: string) =>
  fetchCharacterBestiarySummary(characterId)
);
