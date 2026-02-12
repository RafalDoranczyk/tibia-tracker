import { cache } from "react";

import { fetchUserSettings } from "../actions";

export const loadUserSettings = cache(fetchUserSettings);
