import type { TypedSupabaseClient } from "../../types";

export function dbGetDamageElements(supabase: TypedSupabaseClient) {
  return supabase
    .from("damage_elements")
    .select("id, name, image_path, slug")
    .order("name", { ascending: true });
}
