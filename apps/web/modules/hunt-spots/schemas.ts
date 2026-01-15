import { z } from "zod";

import { SupabaseId } from "@/schemas/shared";

// ========================================
// Hunt Places
// ========================================

export const HuntPlaceSchema = z.object({
  id: z.number(),
  user_id: SupabaseId.nullable(),
  name: z.string(),
  image_url: z.string().url().nullable().optional(),
});

export type HuntPlace = z.infer<typeof HuntPlaceSchema>;

// ========================================
// API Schemas - derived from main schema
// ========================================

// Create / Update payloads
export const CreateHuntPlacePayloadSchema = HuntPlaceSchema.omit({
  id: true,
});

export type CreateHuntPlacePayload = z.infer<typeof CreateHuntPlacePayloadSchema>;

export const UpdateHuntPlacePayloadSchema = HuntPlaceSchema.partial().omit({
  id: true,
  user_id: true,
});

export type UpdateHuntPlacePayload = z.infer<typeof UpdateHuntPlacePayloadSchema>;

export const DeleteHuntPlacePayloadSchema = z.object({
  id: z.number(),
});

export type DeleteHuntPlacePayload = z.infer<typeof DeleteHuntPlacePayloadSchema>;

// Fetch payload
export const FetchHuntPlacesPayloadSchema = z.object({
  user_id: SupabaseId.optional(),
});

export type FetchHuntPlacesPayload = z.infer<typeof FetchHuntPlacesPayloadSchema>;

// Fetch response
export const FetchHuntPlacesResponseSchema = z.array(HuntPlaceSchema);

export type FetchHuntPlacesResponse = z.infer<typeof FetchHuntPlacesResponseSchema>;
