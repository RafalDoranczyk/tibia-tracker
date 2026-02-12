import { cache } from "react";

import { fetchPreyBonuses } from "../actions";

export const loadPreyBonuses = cache(fetchPreyBonuses);
