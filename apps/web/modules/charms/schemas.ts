import { z } from "zod";

import { PositiveNumber, SupabaseId } from "@/schemas/shared";

// ========================================
// Base Charm
// ========================================

export const CharmSchema = z.object({
  id: SupabaseId,
  name: z.string(),
  type: z.enum(["Major", "Minor"]),
  description: z.string().nullable(),
  cost_lvl1: PositiveNumber,
  cost_lvl2: PositiveNumber,
  cost_lvl3: PositiveNumber,
  effect_lvl1: z.string().nullable(),
  effect_lvl2: z.string().nullable(),
  effect_lvl3: z.string().nullable(),
  image_url: z.string().url(),
});

export type Charm = z.infer<typeof CharmSchema>;

// ========================================
// Character Charm (DB row)
// ========================================

export const CharacterCharmSchema = z.object({
  id: SupabaseId,
  character_id: SupabaseId,
  charm_id: SupabaseId,
  level: z.number().int().min(1).max(3),
  unlocked_at: z.string(),
});

export type CharacterCharm = z.infer<typeof CharacterCharmSchema>;

// ========================================
// Character Charm (with join on charms)
// ========================================

export const CharacterCharmWithCharmSchema = CharacterCharmSchema.extend({
  charm: CharmSchema,
});

export type CharacterCharmWithCharm = z.infer<typeof CharacterCharmWithCharmSchema>;

// ========================================
// Charm with status (flattened for UI)
// ========================================

export const CharmWithStatusSchema = CharmSchema.extend({
  unlocked: z.boolean(),
  level: z.number().int().min(0).max(3),
  unlocked_at: z.string().nullable(),
});

export type CharmWithStatus = z.infer<typeof CharmWithStatusSchema>;

// ========================================
// Fetch Charms
// ========================================

export const FetchCharmsPayloadSchema = z.object({
  type: z.enum(["Major", "Minor"]).optional(), // optional filter
});

export type FetchCharmsPayload = z.infer<typeof FetchCharmsPayloadSchema>;

export const FetchCharmsResponseSchema = z.array(CharmSchema);

export type FetchCharmsResponse = z.infer<typeof FetchCharmsResponseSchema>;

// ========================================
// Fetch Character Charms (with join)
// ========================================

export const FetchCharacterCharmsPayloadSchema = z.object({
  character_id: SupabaseId,
});

export type FetchCharacterCharmsPayload = z.infer<typeof FetchCharacterCharmsPayloadSchema>;

export const FetchCharacterCharmsResponseSchema = z.array(CharacterCharmWithCharmSchema);

export type FetchCharacterCharmsResponse = z.infer<typeof FetchCharacterCharmsResponseSchema>;

// ========================================
// API Schemas - Create/Update/Delete
// ========================================

// Charms (admin/seed only)
export const CreateCharmPayloadSchema = CharmSchema.omit({ id: true });
export const UpdateCharmPayloadSchema = CharmSchema.partial().omit({ id: true });

// Character Charms (user progression)
export const CreateCharacterCharmPayloadSchema = CharacterCharmSchema.omit({
  id: true,
  unlocked_at: true,
});
export const UpdateCharacterCharmPayloadSchema = z.object({
  id: SupabaseId,
  level: z.number().int().min(1).max(3),
});
export const DeleteCharacterCharmPayloadSchema = z.object({ id: SupabaseId });

// ========================================
// Action: Unlock
// ========================================

export const UnlockCharacterCharmPayloadSchema = z.object({
  characterId: SupabaseId,
  charmId: SupabaseId,
  level: z.number().int().min(1).max(3),
});

export type UnlockCharacterCharmPayload = z.infer<typeof UnlockCharacterCharmPayloadSchema>;
