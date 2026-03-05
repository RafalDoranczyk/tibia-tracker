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

export const GlobalCharacterSchema = z.object({
  id: UUID,
  name: NonEmptyString,
  world: NonEmptyString,
  vocation: CharacterVocationSchema,
  last_sync_at: z.string().nullable(),
  sync_status: z.enum(["idle", "pending", "error"]),
  last_sync_error: z.string().nullable(),
  created_at: z.string(),
  peak_experience: z.number().nullable(),
  peak_level: z.number().nullable(),
  peak_recorded_at: z.string().nullable(),
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
