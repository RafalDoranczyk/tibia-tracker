import type { TypedSupabaseClient } from "@/core/supabase";

export function deleteCharacter(supabase: TypedSupabaseClient, id: string) {
  return supabase.from("characters").delete().eq("id", id);
}
