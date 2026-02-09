import { z } from "zod";

import { CharacterIDSchema } from "@/modules/characters";
import { LocalDatetime, NonNegativeInt } from "@/schemas";

import { MonsterSchema } from "./monster.schema";

/**
 * Relation: Character ↔ Monster bestiary progress
 */
export const CharacterBestiarySchema = z.object({
  id: NonNegativeInt,
  character_id: CharacterIDSchema,
  monster_id: MonsterSchema.shape.id,
  kills: NonNegativeInt,
  stage: NonNegativeInt,
  has_soul: z.boolean(),
  created_at: LocalDatetime,
});

export type CharacterBestiary = z.infer<typeof CharacterBestiarySchema>;

/**
 * Joined read model (relation + monster)
 */
export const CharacterBestiaryEntrySchema = CharacterBestiarySchema.extend({
  monster: MonsterSchema,
});

export type CharacterBestiaryEntry = z.infer<typeof CharacterBestiaryEntrySchema>;

/**
 * Mutation payload
 */
export const UpdateCharacterBestiaryEntrySchema = z.object({
  characterId: CharacterIDSchema,
  monsterId: MonsterSchema.shape.id,
  updates: z.object({
    kills: NonNegativeInt.optional(),
    stage: NonNegativeInt.optional(),
    has_soul: z.boolean().optional(),
  }),
});
