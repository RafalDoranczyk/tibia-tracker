import { cache } from "react";

import { fetchMonstersPreview } from "../actions";

export const loadMonstersPreview = cache(fetchMonstersPreview);
