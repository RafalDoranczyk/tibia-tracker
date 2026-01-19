import { z } from "zod";

import { ALLOWED_VOCATIONS } from "./constants";

export const characterSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  vocation: z.enum(ALLOWED_VOCATIONS),
  world: z.string().min(1, "World is required"),
});

export const createCharacterSchema = characterSchema.omit({
  id: true,
});

export const deleteCharacterSchema = z.object({
  id: characterSchema.shape.id,
});

export const updateCharacterSchema = characterSchema;
