import type { TypedSupabaseClient } from "@/core/supabase/types";

export function resetCharacterCharms(supabase: TypedSupabaseClient, p_character_id: string) {
  return supabase.rpc("reset_all_charms", {
    p_character_id,
  });
}
