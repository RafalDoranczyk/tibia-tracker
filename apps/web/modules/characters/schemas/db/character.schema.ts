import { z } from "zod";

import type { Enums, Tables } from "@/core/supabase/types";
import { NonEmptyString, UUID } from "@/lib/zod";
import { MIN_CHARACTER_NAME_LENGTH } from "../../constants";

const CharacterVocationSchema = z.enum([
  "knight",
  "paladin",
  "sorcerer",
  "druid",
  "monk",
]) satisfies z.ZodType<Enums<"character_vocation">>;
export type CharacterVocation = z.infer<typeof CharacterVocationSchema>;

export const CharacterIDSchema = UUID;
export const CharacterNameSchema = NonEmptyString.min(MIN_CHARACTER_NAME_LENGTH);

export const CharacterSchema = z.object({
  id: CharacterIDSchema,
  name: CharacterNameSchema,
  vocation: CharacterVocationSchema,
  world: NonEmptyString,
  synchronized_at: z.string().nullable(),
}) satisfies z.ZodType<Omit<Tables<"characters">, "user_id">>;
export type Character = z.infer<typeof CharacterSchema>;
