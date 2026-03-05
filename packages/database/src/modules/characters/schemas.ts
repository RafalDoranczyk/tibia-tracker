import { NonEmptyString, UUID, z } from "@repo/validation";
import type { Enums, Tables } from "../../types/db";

export const CharacterVocationSchema = z.enum([
  "knight",
  "paladin",
  "sorcerer",
  "druid",
  "monk",
  "none",
]) satisfies z.ZodType<Enums<"character_vocation">>;
export type CharacterVocation = z.infer<typeof CharacterVocationSchema>;

export const CharacterIDSchema = UUID;
export type CharacterID = z.infer<typeof CharacterIDSchema>;

export const CharacterSchema = z.object({
  id: CharacterIDSchema,
  name: NonEmptyString,
  global_character_id: CharacterIDSchema,
}) satisfies z.ZodType<Omit<Tables<"characters">, "user_id">>;
export type Character = z.infer<typeof CharacterSchema>;

export const GlobalCharacterSchema = z.object({
  id: CharacterIDSchema,
  name: NonEmptyString,
  world: NonEmptyString,
  vocation: CharacterVocationSchema,
  last_sync_at: z.string().nullable(),
  sync_status: z.enum(["idle", "pending", "error"]),
  last_sync_error: z.string().nullable(),
  created_at: z.string(),
}) satisfies z.ZodType<Tables<"global_characters">>;
export type GlobalCharacter = z.infer<typeof GlobalCharacterSchema>;

export const SetupNewCharacterPayloadSchema = GlobalCharacterSchema.pick({
  name: true,
  world: true,
  vocation: true,
}).extend({
  userId: UUID,
});
export type SetupNewCharacterPayload = z.infer<typeof SetupNewCharacterPayloadSchema>;
