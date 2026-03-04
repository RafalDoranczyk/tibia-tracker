import { z } from "@repo/validation";
import type { Tables } from "../../types/db";
import { CharacterIDSchema } from "../characters/schemas";
import { CharmSchema } from "../charms/schemas";

/** Valid levels for a charm on a character */
export const CHARM_LEVELS = [1, 2, 3] as const;
export type CharmLevel = (typeof CHARM_LEVELS)[number];

export const CharmLevelSchema = z.union(
  CHARM_LEVELS.map((lvl) => z.literal(lvl)) as [
    z.ZodLiteral<CharmLevel>,
    z.ZodLiteral<CharmLevel>,
    z.ZodLiteral<CharmLevel>,
  ]
);

/** * Base relation: Link between a specific character and a charm
 */
export const CharacterCharmSchema = z.object({
  character_id: CharacterIDSchema,
  charm_id: CharmSchema.shape.id,
  level: CharmLevelSchema,
}) satisfies z.ZodType<Tables<"character_charms">>;

export type CharacterCharm = z.infer<typeof CharacterCharmSchema>;

/** * Detailed view: Character's charm with full charm metadata included
 */
export const CharacterCharmDetailedSchema = CharacterCharmSchema.extend({
  charm: CharmSchema,
});

export type CharacterCharmDetailed = z.infer<typeof CharacterCharmDetailedSchema>;
