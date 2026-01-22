import { z } from "zod";

import { PositiveNumber, PositiveNumberNonZero } from "@/schemas/shared";

import { CharacterSchema } from "../characters";
import { BESTIARY_CLASSES } from "./constants";

export const MonsterSchema = z.object({
  // Monsters ID is a number in supabase db
  id: z.number(),

  name: z.string(),
  exp: PositiveNumber,
  image_url: z.string().url(),
  hp: PositiveNumberNonZero,
  elemental_resistances: z.record(z.string(), z.number()),
  charm_points: PositiveNumberNonZero,
  bestiary_class: z.enum(BESTIARY_CLASSES),
  bestiary_difficulty: PositiveNumber,
  sort_order: PositiveNumber,
  bestiary_kills: z.object({
    stage1: PositiveNumber,
    stage2: PositiveNumber,
    stage3: PositiveNumber,
  }),
});

/**
 * Join table between character and monster bestiary progress.
 */
export const CharacterBestiarySchema = z.object({
  // This is a number in supabase db
  id: z.number(),
  character_id: CharacterSchema.shape.id,
  monster_id: MonsterSchema.shape.id,
  kills: PositiveNumber,
  stage: PositiveNumber,
  has_soul: z.boolean(),
});

export const CharacterBestiaryEntrySchema = CharacterBestiarySchema.extend({
  monster: MonsterSchema,
});

export const MonsterWithCharacterProgressSchema = MonsterSchema.extend({
  kills: PositiveNumber,
  stage: PositiveNumber,
  has_soul: z.boolean(),
});

export const UpdateCharacterBestiaryEntrySchema = z.object({
  characterId: CharacterSchema.shape.id,
  monsterId: MonsterSchema.shape.id,
  updates: z.object({
    kills: PositiveNumber.optional(),
    stage: PositiveNumber.optional(),
    has_soul: z.boolean().optional(),
  }),
});

export const CharacterBestiarySummarySchema = z.object({
  character_id: CharacterSchema.shape.id,
  unlocked_charm_points: PositiveNumber,
  total_charm_points: PositiveNumber,
  completed_soulpits: PositiveNumber,
});

export const CharacterBestiaryClassSummarySchema = z.object({
  character_id: CharacterSchema.shape.id,
  bestiary_class: z.enum(BESTIARY_CLASSES),
  total_monsters: PositiveNumber,
  completed_monsters: PositiveNumber,
  completed_soulpits: PositiveNumber,
  total_charm_points: PositiveNumber,
  unlocked_charm_points: PositiveNumber,
});

export const FetchCharacterBestiaryFullSchema = z.object({
  characterId: CharacterSchema.shape.id,
  bestiaryClass: z.enum(BESTIARY_CLASSES).optional(),

  limit: z.number().min(1).max(100).optional(),
  page: z.number().min(1).optional(),
  search: z.string().min(1).optional(),
});
