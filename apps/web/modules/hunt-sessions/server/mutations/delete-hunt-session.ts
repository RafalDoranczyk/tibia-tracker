import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbDeleteHuntSession(supabase: TypedSupabaseClient, id: number) {
  return supabase.from("hunt_sessions").delete().eq("id", id);
}
