import { z } from "zod";

import type { Tables } from "@/core/supabase";
import { NonEmptyString, PositiveInt } from "@/lib/zod";

export const DamageElementSchema = z.object({
  id: PositiveInt,
  name: NonEmptyString,
  image_path: NonEmptyString,
}) satisfies z.ZodType<Tables<"damage_elements">>;
export type DamageElement = z.infer<typeof DamageElementSchema>;
