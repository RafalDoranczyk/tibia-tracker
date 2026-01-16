import { z } from "zod";

import { BESTIARY_CLASSES } from "./constants";

export const MonsterSchema = z.object({
  id: z.number(),
  name: z.string(),
  exp: z.number(),
  image_url: z.string().url(),
  hp: z.number(),
  elemental_resistances: z.record(z.string(), z.number()),
  charm_points: z.number(),
  bestiary_class: z.enum(BESTIARY_CLASSES),
  bestiary_difficulty: z.number(),
  sort_order: z.number(),
  bestiary_kills: z.object({
    stage1: z.number(),
    stage2: z.number(),
    stage3: z.number(),
  }),
});

export const CharacterBestiarySchema = z.object({
  id: z.number(),
  character_id: z.string().uuid(),
  monster_id: z.number(),
  kills: z.number(),
  stage: z.number(),
  has_soul: z.boolean(),
});

export const CharacterBestiaryEntrySchema = CharacterBestiarySchema.extend({
  monster: MonsterSchema,
});

export const MonsterWithCharacterProgressSchema = MonsterSchema.extend({
  kills: z.number(),
  stage: z.number(),
  has_soul: z.boolean(),
});

// ------------------------------------
// 🧾 Character Bestiary Summary
// ------------------------------------

export const CharacterBestiarySummarySchema = z.object({
  character_id: z.string().uuid(),
  unlocked_charm_points: z.number(),
  total_charm_points: z.number(),
  completed_soulpits: z.number(),
});

export const CharacterBestiaryClassSummarySchema = z.object({
  character_id: z.string().uuid(),
  bestiary_class: z.string(),
  total_monsters: z.number(),
  completed_monsters: z.number(),
  completed_soulpits: z.number(),
  total_charm_points: z.number(),
  unlocked_charm_points: z.number(),
});
