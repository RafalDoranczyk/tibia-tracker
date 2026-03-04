import { ImbuingPriceKeySchema } from "@repo/database";
import { z } from "@repo/validation";

export const ImbuingFormSchema = z.record(ImbuingPriceKeySchema, z.coerce.number().int().min(0));

export type ImbuingFormValues = z.infer<typeof ImbuingFormSchema>;
