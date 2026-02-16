import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbGetMonsterList(supabase: TypedSupabaseClient) {
  return supabase.from("monsters").select("*").order("name", { ascending: true });
}
