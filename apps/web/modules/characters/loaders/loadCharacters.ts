import { cache } from "react";

import { fetchCharacters } from "../actions/fetch-characters.action";

export const loadCharacters = cache(fetchCharacters);
