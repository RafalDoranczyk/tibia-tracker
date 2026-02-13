import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbGetItemList(supabase: TypedSupabaseClient) {
  return supabase
    .from("items")
    .select(`
    id,
    name,
    image_path,
    created_at,
    tibia_item_id,
    updated_at
  `)
    .order("name", { ascending: true });
}
