import type { TypedSupabaseClient } from "../../types";

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

export function dbGetSupplyList(supabase: TypedSupabaseClient) {
  return supabase
    .from("supplies")
    .select("id, name, image_path")
    .order("name", { ascending: true });
}
