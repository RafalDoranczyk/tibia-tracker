import { z } from "zod";

import { ImbuingPriceKeySchema } from "../db/imbuing-keys.schema";

export const ImbuingFormSchema = z.record(ImbuingPriceKeySchema, z.coerce.number().int().min(0));

export type ImbuingFormValues = z.infer<typeof ImbuingFormSchema>;
