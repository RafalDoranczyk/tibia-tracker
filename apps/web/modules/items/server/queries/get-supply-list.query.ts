import type { TypedSupabaseClient } from "@/core/supabase";

export function getSupplies(supabase: TypedSupabaseClient) {
  return supabase
    .from("supplies")
    .select("id, name, image_path")
    .order("name", { ascending: true });
}
