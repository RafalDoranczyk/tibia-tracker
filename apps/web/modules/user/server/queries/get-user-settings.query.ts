import type { TypedSupabaseClient } from "@/core/supabase/types";

export function getUserSettings(supabase: TypedSupabaseClient) {
  return supabase.from("user_settings").select("user_id, last_active_character_id").maybeSingle();
}
