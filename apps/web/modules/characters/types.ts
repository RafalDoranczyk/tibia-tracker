import type { z } from "zod";

import type {
  characterSchema,
  createCharacterSchema,
  deleteCharacterSchema,
  updateCharacterSchema,
} from "./schemas";

export type Character = z.infer<typeof characterSchema>;
export type CreateCharacterPayload = z.infer<typeof createCharacterSchema>;
export type UpdateCharacterPayload = z.infer<typeof updateCharacterSchema>;
export type DeleteCharacterPayload = z.infer<typeof deleteCharacterSchema>;
