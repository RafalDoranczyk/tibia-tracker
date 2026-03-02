import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbGetCharacters(supabase: TypedSupabaseClient, userId: string) {
  return supabase
    .from("characters")
    .select("id, name, vocation, world, synchronized_at")
    .order("name", { ascending: true })
    .eq("user_id", userId);
}
