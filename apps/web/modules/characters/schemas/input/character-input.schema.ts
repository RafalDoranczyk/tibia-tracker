import type { z } from "zod";

import { CharacterIDSchema, CharacterSchema } from "../db/character.schema";

export const CreateCharacterSchema = CharacterSchema.omit({
  id: true,
});
export type CreateCharacterPayload = z.infer<typeof CreateCharacterSchema>;

export const UpdateCharacterSchema = CharacterSchema.partial().extend({
  id: CharacterIDSchema,
});

export const CharacterFormSchema = CreateCharacterSchema;
export type CharacterForm = z.infer<typeof CharacterFormSchema>;
