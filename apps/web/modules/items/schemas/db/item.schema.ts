import { z } from "zod";

import type { Tables } from "@/core/supabase/types";
import { NonEmptyString } from "@/lib/zod";

export const ItemSchema = z.object({
  id: z.number(),
  name: NonEmptyString,
  image_path: NonEmptyString,
  created_at: z.string(),
  tibia_item_id: z.number(),
  updated_at: z.string().nullable(),
}) satisfies z.ZodType<Tables<"items">>;

export type Item = z.infer<typeof ItemSchema>;

// For cases where we only need a subset of the item fields, such as in lists or previews.
export const ItemPreviewSchema = ItemSchema.pick({
  id: true,
  name: true,
  image_path: true,
});
export type ItemPreview = z.infer<typeof ItemPreviewSchema>;
