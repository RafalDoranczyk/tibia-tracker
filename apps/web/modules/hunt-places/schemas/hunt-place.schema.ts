import { z } from "zod";

import type { Tables } from "@/core/supabase";
import { NonEmptyString } from "@/lib/zod";

export const HuntPlaceSchema = z.object({
  id: z.number(),
  name: NonEmptyString,
  image_path: z.string().url().nullable(),
}) satisfies z.ZodType<Omit<Tables<"hunt_places">, "user_id">>;

export type HuntPlace = z.infer<typeof HuntPlaceSchema>;
