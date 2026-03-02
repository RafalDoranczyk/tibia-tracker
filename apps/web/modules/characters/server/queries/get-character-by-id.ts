import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbGetCharacterById(supabase: TypedSupabaseClient, characterId: string) {
  return supabase
    .from("characters")
    .select("id, name, vocation, world, synchronized_at")
    .eq("id", characterId)
    .single();
}
