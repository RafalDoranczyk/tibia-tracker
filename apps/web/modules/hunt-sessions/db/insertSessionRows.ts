import { getUserScopedQuery } from "@/core/supabase";

export async function insertSessionRows<T>(table: string, session_id: number, rows?: T[]) {
  if (!rows?.length) return;

  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase.from(table).insert(rows.map((r) => ({ ...r, session_id })));

  if (error) {
    throw new Error(`Failed to insert rows into ${table}`);
  }
}
