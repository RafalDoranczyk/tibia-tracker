import type { z } from "zod";

import { CharacterSchema } from "../db/character.schema";

export const CreateCharacterSchema = CharacterSchema.omit({
  id: true,
  synchronized_at: true,
});
export type CreateCharacterPayload = z.infer<typeof CreateCharacterSchema>;

//  For editing by user - only a subset of fields
export const UpdateCharacterSchema = CharacterSchema.omit({
  synchronized_at: true,
});
export type UpdateCharacterPayload = z.infer<typeof UpdateCharacterSchema>;
