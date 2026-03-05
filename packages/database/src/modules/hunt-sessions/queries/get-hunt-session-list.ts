import type { TypedSupabaseClient } from "../../../types";
import type { FetchHuntSessionListPayload } from "../schemas/hunt-session.schema";

const SELECT = `
  id,
  date,
  duration_seconds,
  level,
  created_at,
  raw_xp_per_hour,
  profit_per_hour,
  place:hunt_places!inner(
    id, 
    name, 
    image_path
  )
` as const;

type DbGetHuntSessionListPayload = {
  supabase: TypedSupabaseClient;
  payload: FetchHuntSessionListPayload;
};

export function dbGetHuntSessionList({ supabase, payload }: DbGetHuntSessionListPayload) {
  const sortCol = payload.sortBy || "created_at";
  const sortDir = payload.sortDirection || "desc";

  let query = supabase
    .from("hunt_sessions")
    .select(SELECT, { count: "exact" })
    .eq("character_id", payload.character_id)
    .order(sortCol, { ascending: sortDir !== "desc" });

  if (typeof payload.limit === "number") {
    const page = Math.max(payload.page ?? 1, 1);
    const from = (page - 1) * payload.limit;
    const to = from + payload.limit - 1;
    query = query.range(from, to);
  }

  return query;
}
