import type { TypedSupabaseClient } from "@/core/supabase";

export function getAuthUser(supabase: TypedSupabaseClient) {
  return supabase.auth.getUser();
}
