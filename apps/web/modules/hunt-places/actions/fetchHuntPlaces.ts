"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { FetchHuntPlacesResponseSchema } from "../schemas";

/**
 * Fetches available hunt places for the current user.
 * Includes both user-specific and global entries.
 */
export async function fetchHuntPlaces() {
  const { user, supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("hunting_places")
    .select("id, user_id, name, image_url")
    .or(`user_id.eq.${user.id},user_id.is.null`);

  if (error) {
    throw new Error("Failed to fetch hunt places");
  }

  return assertZodParse(FetchHuntPlacesResponseSchema, data ?? []);
}
