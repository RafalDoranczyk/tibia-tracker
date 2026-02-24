import type { TypedSupabaseClient } from "@/core/supabase/types";

import type { FetchHuntSessionListPayload, FetchHuntSessionListResponse } from "../../schemas";

const SELECT = `
  id,
  date,
  duration_seconds,
  level,
  created_at,
  updated_at,
  xp_gain,
  raw_xp_gain,
  profit,
  place:hunt_places!inner(
    id, 
    name, 
    image_path
  )
` as const;

export function dbGetHuntSessionList(
  supabase: TypedSupabaseClient,
  payload: FetchHuntSessionListPayload
) {
  const sortCol = payload.sortBy || "date";
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

  return query.returns<FetchHuntSessionListResponse["data"]>();
}
