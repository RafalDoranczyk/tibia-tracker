import type { z } from "zod";

import type {
  CreateHuntPlacePayloadSchema,
  DeleteHuntPlacePayloadSchema,
  FetchHuntPlacesResponseSchema,
  HuntPlaceSchema,
  UpdateHuntPlacePayloadSchema,
} from "./schemas";

export type CreateHuntPlacePayload = z.infer<typeof CreateHuntPlacePayloadSchema>;
export type UpdateHuntPlacePayload = z.infer<typeof UpdateHuntPlacePayloadSchema>;
export type DeleteHuntPlacePayload = z.infer<typeof DeleteHuntPlacePayloadSchema>;
export type FetchHuntPlacesResponse = z.infer<typeof FetchHuntPlacesResponseSchema>;

export type HuntPlace = z.infer<typeof HuntPlaceSchema>;
