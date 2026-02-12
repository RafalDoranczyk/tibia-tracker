import { cache } from "react";

import { fetchDamageElements } from "../actions";

export const loadDamageElements = cache(fetchDamageElements);
