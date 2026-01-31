import { z } from "zod";

export const DamageElementSchema = z.object({
  id: z.number(),
  name: z.string(),
  image_path: z.string(),
});

export const DamageSourceSchema = z.object({
  id: z.number(),
  name: z.string(),
  image_path: z.string(),
});

export const PreyBonusSchema = z.object({
  id: z.number(),
  description: z.string(),
  bonus_value: z.number(),
  bonus_type: z.enum(["exp", "loot", "damage", "damage_reduction"]),
});
