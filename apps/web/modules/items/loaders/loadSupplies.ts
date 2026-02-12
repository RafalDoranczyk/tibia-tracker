import { cache } from "react";

import { fetchSupplies } from "../actions";

export const loadSupplies = cache(fetchSupplies);
