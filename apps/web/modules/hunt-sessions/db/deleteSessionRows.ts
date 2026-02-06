import { requireAuthenticatedSupabase } from "@/core/supabase";

export async function deleteSessionRows(table: string, sessionId: number) {
  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await supabase.from(table).delete().eq("session_id", sessionId);

  if (error) throw error;
}
