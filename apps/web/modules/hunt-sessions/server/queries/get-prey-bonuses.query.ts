import type { TypedSupabaseClient } from "@/core/supabase";

export function getPreyBonuses(supabase: TypedSupabaseClient) {
  return supabase.from("prey_bonuses").select("id, description, bonus_value, bonus_type");
}
