import { z } from "zod";

export const HuntPlaceSchema = z.object({
  // Hunt place ID is a number in supabase db
  id: z.number(),

  name: z.string(),
  image_url: z.string().url().nullable().optional(),
});

export const CreateHuntPlacePayloadSchema = HuntPlaceSchema.omit({
  id: true,
});

export const UpdateHuntPlacePayloadSchema = HuntPlaceSchema.partial().omit({
  id: true,
});

export const DeleteHuntPlacePayloadSchema = z.object({
  id: HuntPlaceSchema.shape.id,
});

export const FetchHuntPlacesResponseSchema = z.array(HuntPlaceSchema);
