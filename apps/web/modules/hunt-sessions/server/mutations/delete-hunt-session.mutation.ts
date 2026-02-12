import type { TypedSupabaseClient } from "@/core/supabase";

export function deleteHuntSession(supabase: TypedSupabaseClient, id: number) {
  return supabase.from("hunt_sessions").delete().eq("id", id);
}
