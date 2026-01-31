import { z } from "zod";

import { NonEmptyString, UUID } from "@/schemas";

import { CHARACTER_VOCATION } from "../constants";

export const CharacterVocationSchema = z.enum(CHARACTER_VOCATION);
export type CharacterVocation = z.infer<typeof CharacterVocationSchema>;
export const CharacterIDSchema = UUID;

export const CharacterSchema = z.object({
  id: CharacterIDSchema,
  name: NonEmptyString,
  vocation: CharacterVocationSchema,
  world: NonEmptyString,
});

export type Character = z.infer<typeof CharacterSchema>;
