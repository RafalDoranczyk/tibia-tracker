import { NonEmptyString, z } from "@repo/validation";
import type { Tables } from "../../types/db";

export const HuntPlaceSchema = z.object({
  id: z.number(),
  name: NonEmptyString,
  image_path: z.string(),
}) satisfies z.ZodType<Omit<Tables<"hunt_places">, "user_id">>;

export type HuntPlace = z.infer<typeof HuntPlaceSchema>;
