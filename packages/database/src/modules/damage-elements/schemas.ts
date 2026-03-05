import { NonEmptyString, PositiveInt, z } from "@repo/validation";
import type { Enums, Tables } from "../../types/db";

export const DamageElementSlugs = z.enum([
  "physical",
  "fire",
  "ice",
  "earth",
  "energy",
  "death",
  "holy",
  "mana_drain",
  "life_drain",
]) satisfies z.ZodType<Enums<"damage_element">>;

export type DamageElementSlug = z.infer<typeof DamageElementSlugs>;

export const DamageElementSchema = z.object({
  id: PositiveInt,
  name: NonEmptyString,
  image_path: NonEmptyString,
  slug: DamageElementSlugs,
}) satisfies z.ZodType<Tables<"damage_elements">>;
export type DamageElement = z.infer<typeof DamageElementSchema>;
