import { z } from "zod";

export const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  image_path: z.string(),
  created_at: z.string(),
  tibia_item_id: z.number().nullable(),
  updated_at: z.string().nullable(),
});

export const FetchItemsResponseSchema = ItemSchema.array();
