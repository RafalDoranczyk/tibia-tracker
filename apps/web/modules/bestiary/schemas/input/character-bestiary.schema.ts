import { CharacterBestiarySchema } from "@repo/database/character-bestiary";
import { CharacterIDSchema } from "@repo/database/characters";
import { MonsterClassSchema } from "@repo/database/monsters";
import { z } from "@repo/validation";
import { BestiaryFiltersSchema } from "./bestiary-filters.schema";

/**
 * Read-only requests
 */
export const CharacterBestiarySummaryRequestSchema = z.object({
  characterId: CharacterIDSchema,
});
export type CharacterBestiarySummaryRequest = z.infer<typeof CharacterBestiarySummaryRequestSchema>;

/**
 * Update bestiary progress
 */
export const FetchCharacterBestiaryClassSummaryPayloadSchema = z.object({
  characterId: CharacterIDSchema,
  bestiaryClass: MonsterClassSchema,
});
export type FetchCharacterBestiaryClassSummaryPayload = z.infer<
  typeof FetchCharacterBestiaryClassSummaryPayloadSchema
>;

export const UpdateCharacterBestiaryPayloadSchema = CharacterBestiarySchema.pick({
  character_id: true,
  monster_id: true,
  kills: true,
  stage: true,
  has_soul: true,
}).extend({
  // We need this to know which cache tags to invalidate, but it's not stored in the character bestiary table
  monster_class: MonsterClassSchema.optional(),
});

export type UpdateCharacterBestiaryPayload = z.infer<typeof UpdateCharacterBestiaryPayloadSchema>;

export const FetchCharacterBestiaryPayloadSchema = z.object({
  characterId: CharacterIDSchema,
  filters: BestiaryFiltersSchema,
});
export type FetchCharacterBestiaryPayload = z.infer<typeof FetchCharacterBestiaryPayloadSchema>;
