import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbGetDamageElements(supabase: TypedSupabaseClient) {
  return supabase
    .from("damage_elements")
    .select("id, name, image_path")
    .order("name", { ascending: true });
}
