import type { z } from "zod";

import { CharacterSchema } from "./character.schema";

export const CreateCharacterSchema = CharacterSchema.omit({
  id: true,
});
export type CreateCharacterPayload = z.infer<typeof CreateCharacterSchema>;

export const DeleteCharacterSchema = CharacterSchema.pick({
  id: true,
});

export const UpdateCharacterSchema = CharacterSchema;
