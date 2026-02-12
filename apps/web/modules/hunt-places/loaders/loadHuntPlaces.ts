import { cache } from "react";

import { fetchHuntPlaces } from "../actions";

export const loadHuntPlaces = cache(fetchHuntPlaces);
