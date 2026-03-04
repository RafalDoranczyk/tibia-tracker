import type { TypedSupabaseClient } from "../../types";

export function dbGetMonsterList(supabase: TypedSupabaseClient) {
  return supabase.from("monsters").select("*").order("name", { ascending: true });
}
