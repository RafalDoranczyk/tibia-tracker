import { cache } from "react";

import { fetchUser } from "../actions";

export const loadUser = cache(fetchUser);
