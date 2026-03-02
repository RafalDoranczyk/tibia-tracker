import type { TypedSupabaseClient } from "@/core/supabase/types";

export async function dbGetLatestExpLogDate(supabase: TypedSupabaseClient) {
  const { data } = await supabase
    .from("experience_log")
    .select("recorded_at")
    .order("recorded_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data?.recorded_at ? new Date(data.recorded_at).getTime() : 0;
}
