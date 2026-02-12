import { cache } from "react";

import { fetchUser } from "../actions/fetch-user.action";

export const loadUser = cache(fetchUser);
