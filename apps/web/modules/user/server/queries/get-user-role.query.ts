import type { TypedSupabaseClient } from "@/core/supabase";

export function getUserRole(supabase: TypedSupabaseClient, id: string) {
  return supabase.from("user_roles").select("role").eq("user_id", id).maybeSingle();
}
