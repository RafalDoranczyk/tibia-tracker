import type { TypedSupabaseClient } from "@/core/supabase";

export function getMonsterListPreview(supabase: TypedSupabaseClient) {
  return supabase
    .from("monsters")
    .select("id, name, image_path")
    .order("name", { ascending: true });
}
