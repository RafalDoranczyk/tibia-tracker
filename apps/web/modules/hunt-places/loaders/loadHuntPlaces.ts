import { cache } from "react";

import { fetchHuntPlaces } from "../actions/fech-hunt-places.action";

export const loadHuntPlaces = cache(fetchHuntPlaces);
