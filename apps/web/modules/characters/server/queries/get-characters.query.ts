import type { TypedSupabaseClient } from "@/core/supabase";

export function getCharacters(supabase: TypedSupabaseClient) {
  return supabase
    .from("characters")
    .select("id, name, vocation, world")
    .order("name", { ascending: true });
}
