import type { TypedSupabaseClient } from "@/core/supabase";

export function getMonsterList(supabase: TypedSupabaseClient) {
  // we want to get all, we can cache it anyway
  return supabase.from("monsters").select("*").order("name", { ascending: true });
}
