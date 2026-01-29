import { z } from "zod";

export const EntityPreviewSchema = z.object({
  id: z.number(),
  name: z.string(),
  image_path: z.string(),
});

export const SupplyItemSchema = EntityPreviewSchema;
export const LootedItemSchema = EntityPreviewSchema;
export const DamageElementSchema = EntityPreviewSchema;
