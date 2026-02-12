import { cache } from "react";

import { fetchCharacters } from "../actions";

export const loadCharacters = cache(fetchCharacters);
