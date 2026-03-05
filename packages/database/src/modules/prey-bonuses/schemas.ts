import { NonEmptyString, PositiveInt, z } from "@repo/validation";
import type { Enums, Tables } from "../../types/db";

const BonusType = z.enum(["exp", "loot", "damage", "damage_reduction"]) satisfies z.ZodType<
  Enums<"prey_bonus_type">
>;

export const PreyBonusSchema = z.object({
  id: PositiveInt,
  description: NonEmptyString,
  bonus_value: z.number(),
  bonus_type: BonusType,
}) satisfies z.ZodType<Tables<"prey_bonuses">>;
export type PreyBonus = z.infer<typeof PreyBonusSchema>;
