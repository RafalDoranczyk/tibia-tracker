import type { TypedSupabaseClient } from "@/core/supabase/types";

export function getCharacters(supabase: TypedSupabaseClient) {
  return supabase
    .from("characters")
    .select("id, name, vocation, world")
    .order("name", { ascending: true });
}
