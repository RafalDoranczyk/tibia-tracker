import { cache } from "react";

import { fetchMonsterList } from "../actions";

export const loadMonsterList = cache(fetchMonsterList);
