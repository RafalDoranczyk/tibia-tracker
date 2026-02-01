import { z } from "zod";

import { NonEmptyString } from "@/schemas";

export const ItemSchema = z.object({
  id: z.number(),
  name: NonEmptyString,
  image_path: NonEmptyString,
  created_at: z.string(),
  tibia_item_id: z.number().nullable(),
  updated_at: z.string().nullable(),
});

export type Item = z.infer<typeof ItemSchema>;

export const FetchItemsResponseSchema = ItemSchema.array();
