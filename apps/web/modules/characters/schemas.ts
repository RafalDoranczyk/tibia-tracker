import { z } from "zod";

export const characterSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  vocation: z.string().nullable().optional(),
  world: z.string().nullable().optional(),
  level: z.number().nullable().optional(),
});

export const charactersSchema = z.array(characterSchema);

export type Character = z.infer<typeof characterSchema>;

export const ALLOWED_VOCATIONS = ["Knight", "Paladin", "Sorcerer", "Druid", "Monk"] as const;

export const AddCharacterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  vocation: z.enum(ALLOWED_VOCATIONS, {
    errorMap: () => ({ message: "Invalid vocation" }),
  }),
  world: z.string().min(1, "World is required"),
  level: z.coerce.number().min(1, "Level must be at least 1"),
});

export type AddCharacterInput = z.infer<typeof AddCharacterSchema>;
