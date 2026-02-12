import { z } from "zod";

import { CharacterIDSchema } from "@/modules/characters";

import { CharacterBestiarySchema } from "../db/character-bestiary.schema";
import { BestiaryClassSchema } from "../db/monster.schema";
import { BestiaryFiltersSchema } from "./bestiary-filters.schema";

/**
 * Read-only requests
 */
export const CharacterBestiarySummaryRequestSchema = z.object({
  characterId: CharacterIDSchema,
});
export type CharacterBestiarySummaryRequest = z.infer<typeof CharacterBestiarySummaryRequestSchema>;

export const CharacterBestiaryClassRequestSchema = z.object({
  characterId: CharacterIDSchema,
  bestiaryClass: BestiaryClassSchema,
});
export type CharacterBestiaryClassRequest = z.infer<typeof CharacterBestiaryClassRequestSchema>;

/**
 * Update bestiary progress
 */
export const UpdateCharacterBestiaryPayloadSchema = CharacterBestiarySchema.pick({
  character_id: true,
  monster_id: true,
  kills: true,
  stage: true,
  has_soul: true,
});
export type UpdateCharacterBestiaryPayload = z.infer<typeof UpdateCharacterBestiaryPayloadSchema>;

export const FetchCharacterBestiaryPayloadSchema = z.object({
  characterId: CharacterIDSchema,
  filters: BestiaryFiltersSchema,
});
export type FetchCharacterBestiaryPayload = z.infer<typeof FetchCharacterBestiaryPayloadSchema>;
