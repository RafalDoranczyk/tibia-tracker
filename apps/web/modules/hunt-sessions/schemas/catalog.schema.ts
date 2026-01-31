import { z } from "zod";

import { NonEmptyString, PositiveInt } from "@/schemas";

export const DamageElementSchema = z.object({
  id: PositiveInt,
  name: NonEmptyString,
  image_path: NonEmptyString,
});
export type DamageElement = z.infer<typeof DamageElementSchema>;

export const DamageSourceSchema = z.object({
  id: PositiveInt,
  name: NonEmptyString,
  image_path: NonEmptyString,
});
export type DamageSource = z.infer<typeof DamageSourceSchema>;

const BonusType = z.enum(["exp", "loot", "damage", "damage_reduction"]);

export const PreyBonusSchema = z.object({
  id: PositiveInt,
  description: NonEmptyString,
  bonus_value: z.number(),
  bonus_type: BonusType,
});
export type PreyBonus = z.infer<typeof PreyBonusSchema>;
