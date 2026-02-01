import { z } from "zod";

import { CharacterSchema } from "./character.schema";

export const CreateCharacterSchema = CharacterSchema.omit({
  id: true,
});
export type CreateCharacterPayload = z.infer<typeof CreateCharacterSchema>;

export const DeleteCharacterSchema = z.object({
  id: CharacterSchema.shape.id,
});

export const UpdateCharacterSchema = CharacterSchema;
