"use server";

import { getUserScopedQuery } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { FetchHuntPlacesResponseSchema, HuntPlaceSchema } from "../schemas";

const columns = HuntPlaceSchema.keyof().options.join(", ");

/**
 * Fetches available hunt places for the current user.
 * Includes both user-specific and global entries.
 */
export async function fetchHuntPlaces() {
  const { user, supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("hunt_places")
    .select(columns)
    .or(`user_id.eq.${user.id},user_id.is.null`);

  if (error) {
    throw new Error("Failed to fetch hunt places");
  }

  return assertZodParse(FetchHuntPlacesResponseSchema, data ?? []);
}
