import { GlobalCharacterSchema } from "@repo/database";
import type { z } from "@repo/validation";

export const CreateCharacterSchema = GlobalCharacterSchema.omit({
  id: true,
  last_sync_at: true,
  created_at: true,
});
export type CreateCharacterPayload = z.infer<typeof CreateCharacterSchema>;
