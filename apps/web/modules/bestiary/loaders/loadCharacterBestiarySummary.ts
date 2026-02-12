import { cache } from "react";

import { fetchCharacterBestiarySummary } from "../actions";

export const loadCharacterBestiarySummary = cache((characterId: string) =>
  fetchCharacterBestiarySummary(characterId)
);
