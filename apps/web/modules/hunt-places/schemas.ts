import type { Tables } from "@repo/database";
import { z } from "zod";
import { NonEmptyString } from "@/lib/zod";

export const HuntPlaceSchema = z.object({
  id: z.number(),
  name: NonEmptyString,
  image_path: z.string(),
}) satisfies z.ZodType<Omit<Tables<"hunt_places">, "user_id">>;

export type HuntPlace = z.infer<typeof HuntPlaceSchema>;
