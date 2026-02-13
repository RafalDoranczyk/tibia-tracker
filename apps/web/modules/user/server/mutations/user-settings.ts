import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbUpdateLastActiveCharacter(
  supabase: TypedSupabaseClient,
  userId: string,
  characterId: string
) {
  return supabase
    .from("user_settings")
    .update({ last_active_character_id: characterId })
    .eq("user_id", userId);
}
