import type { TypedSupabaseClient } from "@/core/supabase";

export function getDamageElements(supabase: TypedSupabaseClient) {
  return supabase
    .from("damage_elements")
    .select("id, name, image_path")
    .order("name", { ascending: true });
}
