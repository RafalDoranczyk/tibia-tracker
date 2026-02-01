import { getUserScopedQuery } from "@/core/supabase";

export async function deleteSessionRows(table: string, sessionId: number) {
  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase.from(table).delete().eq("session_id", sessionId);

  if (error) throw error;
}
