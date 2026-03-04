import type { TypedSupabaseClient } from "../../types";

export function dbGetPreyBonuses(supabase: TypedSupabaseClient) {
  return supabase.from("prey_bonuses").select("id, description, bonus_value, bonus_type");
}
