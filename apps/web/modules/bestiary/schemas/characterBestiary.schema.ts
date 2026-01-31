import { z } from "zod";

import { PaginationSchema } from "@/lib/pagination";
import { CharacterSchema } from "@/modules/characters";
import { NonNegativeInt } from "@/schemas";

import { BestiaryClassSchema } from "./bestiaryFilters.schema";
import { MonsterSchema } from "./monster.schema";

/**
 * Relation: Character ↔ Monster bestiary progress
 */
export const CharacterBestiarySchema = z.object({
  id: NonNegativeInt,
  character_id: CharacterSchema.shape.id,
  monster_id: MonsterSchema.shape.id,
  kills: NonNegativeInt,
  stage: NonNegativeInt,
  has_soul: z.boolean(),
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
  characterId: CharacterSchema.shape.id,
  monsterId: MonsterSchema.shape.id,
  updates: z.object({
    kills: NonNegativeInt.optional(),
    stage: NonNegativeInt.optional(),
    has_soul: z.boolean().optional(),
  }),
});

export type UpdateCharacterBestiaryEntry = z.infer<typeof UpdateCharacterBestiaryEntrySchema>;

/**
 * Fetch params (query input)
 */
export const FetchCharacterBestiaryParamsSchema = z
  .object({
    characterId: CharacterSchema.shape.id,
    bestiaryClass: BestiaryClassSchema.optional(),
  })
  .merge(
    PaginationSchema.pick({
      page: true,
      limit: true,
      search: true,
    })
  );

export type FetchCharacterBestiaryParams = z.infer<typeof FetchCharacterBestiaryParamsSchema>;
