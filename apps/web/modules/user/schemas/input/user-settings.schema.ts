import { z } from "zod";

import { CharacterIDSchema } from "@/modules/characters";

export const UpdateUserSettingsSchema = z
  .object({
    last_active_character_id: CharacterIDSchema.nullable(),
  })
  .partial();

export type UpdateUserSettingsValues = z.infer<typeof UpdateUserSettingsSchema>;
