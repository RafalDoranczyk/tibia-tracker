import type { TypedSupabaseClient } from "@/core/supabase/types";

export function getUserRole(supabase: TypedSupabaseClient, id: string) {
  return supabase.from("user_roles").select("role").eq("user_id", id).maybeSingle();
}
