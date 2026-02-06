"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { FetchHuntPlacesResponseSchema, HuntPlaceSchema } from "../schemas/hunt-place.schema";

const SELECT = HuntPlaceSchema.keyof().options.join(", ");

/**
 * Fetches available hunt places for the current user.
 * Includes both user-specific and global entries.
 */
export async function fetchHuntPlaces() {
  const { userId, supabase } = await requireAuthenticatedSupabase();

  const { data, error } = await supabase
    .from("hunt_places")
    .select(SELECT)
    .or(`user_id.eq.${userId},user_id.is.null`);

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to fetch hunt places");
  }

  return assertZodParse(FetchHuntPlacesResponseSchema, data);
}
