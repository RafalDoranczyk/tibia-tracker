import { z } from "zod";

export const HuntPlaceSchema = z.object({
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
  id: z.number(),
});

export const FetchHuntPlacesResponseSchema = z.array(HuntPlaceSchema);
