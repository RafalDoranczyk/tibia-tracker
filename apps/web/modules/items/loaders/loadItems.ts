import { cache } from "react";

import { fetchItems } from "../actions/fetch-items.action";

export const loadItems = cache(fetchItems);
