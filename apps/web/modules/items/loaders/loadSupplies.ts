import { cache } from "react";

import { fetchSupplies } from "../actions/fetch-supply-items.action";

export const loadSupplies = cache(fetchSupplies);
