import { z } from "zod";

import { SupabaseId } from "@/schemas/shared";

import { ALLOWED_VOCATIONS } from "./constants";

export const CharacterSchema = z.object({
  id: SupabaseId,
  name: z.string().min(1, "Name is required"),
  vocation: z.enum(ALLOWED_VOCATIONS),
  world: z.string().min(1, "World is required"),
});

export const CreateCharacterSchema = CharacterSchema.omit({
  id: true,
});

export const DeleteCharacterSchema = z.object({
  id: CharacterSchema.shape.id,
});

export const updateCharacterSchema = CharacterSchema;
