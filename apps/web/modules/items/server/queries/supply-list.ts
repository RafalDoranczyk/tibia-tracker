import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbGetSupplyList(supabase: TypedSupabaseClient) {
  return supabase
    .from("supplies")
    .select("id, name, image_path")
    .order("name", { ascending: true });
}
