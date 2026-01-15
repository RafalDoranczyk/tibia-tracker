import { z } from "zod";

export const BESTIARY_CLASSES = [
  "Amphibic",
  "Aquatic",
  "Bird",
  "Construct",
  "Demon",
  "Dragon",
  "Elemental",
  "Extra Dimensional",
  "Fey",
  "Giant",
  "Human",
  "Humanoid",
  "Inkborn",
  "Lycanthrope",
  "Magical",
  "Mammal",
  "Plant",
  "Reptile",
  "Slime",
  "Undead",
  "Vermin",
] as const;

export type BestiaryClass = (typeof BESTIARY_CLASSES)[number];

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

export type Monster = z.infer<typeof MonsterSchema>;

export const CharacterBestiarySchema = z.object({
  id: z.number(),
  character_id: z.string().uuid(),
  monster_id: z.number(),
  kills: z.number(),
  stage: z.number(),
  has_soul: z.boolean(),
});

export type CharacterBestiary = z.infer<typeof CharacterBestiarySchema>;

export const CharacterBestiaryEntrySchema = CharacterBestiarySchema.extend({
  monster: MonsterSchema,
});

export type CharacterBestiaryEntry = z.infer<typeof CharacterBestiaryEntrySchema>;

export const MonsterWithCharacterProgressSchema = MonsterSchema.extend({
  kills: z.number(),
  stage: z.number(),
  has_soul: z.boolean(),
});

export type MonsterWithCharacterProgress = z.infer<typeof MonsterWithCharacterProgressSchema>;

// ------------------------------------
// 🧾 Character Bestiary Summary
// ------------------------------------

export const CharacterBestiarySummarySchema = z.object({
  character_id: z.string().uuid(),
  unlocked_charm_points: z.number(),
  total_charm_points: z.number(),
  completed_soulpits: z.number(),
});

export type CharacterBestiarySummary = z.infer<typeof CharacterBestiarySummarySchema>;

export const CharacterBestiaryClassSummarySchema = z.object({
  character_id: z.string().uuid(),
  bestiary_class: z.string(),
  total_monsters: z.number(),
  completed_monsters: z.number(),
  completed_soulpits: z.number(),
  total_charm_points: z.number(),
  unlocked_charm_points: z.number(),
});

export type CharacterBestiaryClassSummary = z.infer<typeof CharacterBestiaryClassSummarySchema>;
