import { z } from "zod";

import { NonEmptyString } from "@/schemas";

export const HuntPlaceSchema = z.object({
  // Hunt place ID is a number in supabase db
  id: z.number(),
  name: NonEmptyString,
  image_path: z.string().url().nullable().optional(),
});
export type HuntPlace = z.infer<typeof HuntPlaceSchema>;

export const FetchHuntPlacesResponseSchema = z.array(HuntPlaceSchema);
