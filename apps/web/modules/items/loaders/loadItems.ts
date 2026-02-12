import { cache } from "react";

import { fetchItems } from "../actions";

export const loadItems = cache(fetchItems);
