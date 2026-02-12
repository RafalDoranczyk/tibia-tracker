import { cache } from "react";

import { fetchUserSettings } from "../actions/fetch-user-settings.action";

export const loadUserSettings = cache(fetchUserSettings);
