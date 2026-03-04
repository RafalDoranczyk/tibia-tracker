import type { TypedSupabaseClient } from "../../types";

type DbGetCharacterExpHistoryPayload = {
  supabase: TypedSupabaseClient;
  globalCharacterId: string;
  since: string;
};

function dbGetCharacterExpHistory({
  supabase,
  globalCharacterId,
  since,
}: DbGetCharacterExpHistoryPayload) {
  return supabase
    .from("experience_log")
    .select("id, character_name, level, experience, recorded_at, rank, global_character_id")
    .eq("global_character_id", globalCharacterId)
    .gte("recorded_at", since)
    .order("recorded_at", { ascending: false });
}

export function dbGetCharacterLast30DaysExp({
  supabase,
  globalCharacterId,
}: Omit<DbGetCharacterExpHistoryPayload, "since">) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  return dbGetCharacterExpHistory({
    supabase,
    globalCharacterId,
    since: thirtyDaysAgo.toISOString(),
  });
}

export function dbGetCharacterLastEntry({
  supabase,
  globalCharacterId,
}: Omit<DbGetCharacterExpHistoryPayload, "since">) {
  return supabase
    .from("experience_log")
    .select("recorded_at")
    .eq("global_character_id", globalCharacterId)
    .order("recorded_at", { ascending: false })
    .limit(1)
    .maybeSingle();
}
