import type { z } from "zod";

import type { ItemSchema } from "./schemas";

export type Item = z.infer<typeof ItemSchema>;
