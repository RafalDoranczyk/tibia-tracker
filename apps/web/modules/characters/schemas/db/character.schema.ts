import { z } from "zod";

import type { Enums, Tables } from "@/core/supabase";
import { NonEmptyString, UUID } from "@/lib/zod";

export const CharacterVocationSchema = z.enum([
  "knight",
  "paladin",
  "sorcerer",
  "druid",
  "monk",
]) satisfies z.ZodType<Enums<"character_vocation">>;
export type CharacterVocation = z.infer<typeof CharacterVocationSchema>;

export const CharacterIDSchema = UUID;

export const CharacterSchema = z.object({
  id: CharacterIDSchema,
  name: NonEmptyString,
  vocation: CharacterVocationSchema,
  world: NonEmptyString,
}) satisfies z.ZodType<Omit<Tables<"characters">, "user_id">>;
export type Character = z.infer<typeof CharacterSchema>;
