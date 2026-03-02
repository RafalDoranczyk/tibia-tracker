import type { TypedSupabaseClient } from "@/core/supabase/types";

export function dbGetCharacterExpHistory(
  supabase: TypedSupabaseClient,
  characterName: string,
  since: string
) {
  return supabase
    .from("experience_log")
    .select("id, character_name, level, experience, recorded_at, rank")
    .eq("character_name", characterName)
    .gte("recorded_at", since)
    .order("recorded_at", { ascending: true });
}

export function dbGetCharacterLast30DaysExp(supabase: TypedSupabaseClient, characterName: string) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return dbGetCharacterExpHistory(supabase, characterName, thirtyDaysAgo.toISOString());
}

export function dbGetCharacterLastEntry(supabase: TypedSupabaseClient, characterName: string) {
  return supabase
    .from("experience_log")
    .select("recorded_at")
    .eq("character_name", characterName)
    .order("recorded_at", { ascending: false })
    .limit(1)
    .maybeSingle();
}
