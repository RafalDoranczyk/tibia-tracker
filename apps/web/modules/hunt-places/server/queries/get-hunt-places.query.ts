import type { TypedSupabaseClient } from "@/core/supabase";

export function getHuntPlaces(supabase: TypedSupabaseClient) {
  return supabase.from("hunt_places").select("id, name, image_path").order("name");
}
