import { NonEmptyString, UUID, z } from "@repo/validation";
import type { Tables } from "../../types/db";

export const CharacterIDSchema = UUID;
export type CharacterID = z.infer<typeof CharacterIDSchema>;

export const CharacterSchema = z.object({
  id: CharacterIDSchema,
  name: NonEmptyString,
  global_character_id: CharacterIDSchema,
}) satisfies z.ZodType<Omit<Tables<"characters">, "user_id">>;

export type Character = z.infer<typeof CharacterSchema>;
