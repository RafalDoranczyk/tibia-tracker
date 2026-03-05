import type { TypedSupabaseClient } from "../../types";

export function dbGetHuntPlaces(supabase: TypedSupabaseClient) {
  return supabase.from("hunt_places").select("id, name, image_path").order("name");
}
