import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbGetCharacter(supabase: TypedSupabaseClient, userId: string, characterId: string) {
  return supabase
    .from("characters")
    .select("id")
    .eq("id", characterId)
    .eq("user_id", userId)
    .single();
}
