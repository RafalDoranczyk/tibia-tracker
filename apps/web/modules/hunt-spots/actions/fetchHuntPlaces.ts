"use server";

import { getUserScopedQuery } from "@/core";
import { FetchHuntPlacesResponseSchema, type HuntPlace } from "@/modules/hunt-spots";
import { assertZodParse } from "@/utils";

export async function fetchHuntPlaces(): Promise<HuntPlace[]> {
  const { user, supabase } = await getUserScopedQuery();

  const { data, error } = await supabase
    .from("hunting_places")
    .select("*")
    .or(`user_id.eq.${user.id},user_id.is.null`);

  if (error) throw error;

  return assertZodParse(FetchHuntPlacesResponseSchema, data);
}
