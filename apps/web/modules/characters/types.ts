import type { z } from "zod";

import type {
  CharacterSchema,
  CreateCharacterSchema,
  DeleteCharacterSchema,
  updateCharacterSchema,
} from "./schemas";

export type Character = z.infer<typeof CharacterSchema>;
export type CreateCharacterPayload = z.infer<typeof CreateCharacterSchema>;
export type UpdateCharacterPayload = z.infer<typeof updateCharacterSchema>;
export type DeleteCharacterPayload = z.infer<typeof DeleteCharacterSchema>;
