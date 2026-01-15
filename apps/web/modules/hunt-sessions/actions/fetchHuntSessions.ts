"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { FetchHuntSessionsResponseSchema, type HuntSession } from "../schemas";

export async function fetchHuntSessions(): Promise<{
  data: HuntSession[];
  count: number;
}> {
  const { user, supabase } = await getUserScopedQuery();

  const { data, count } = await supabase
    .from("hunt_sessions")
    .select(
      `
      id,
      user_id,
      player_count,
      level,
      balance,
      raw_xp_gain,
      date,minutes,
      exp_per_hour,
      profit_per_hour,
      place:hunting_places!inner(id, name,user_id, image_url)`,
      { count: "exact" }
    )
    .eq("user_id", user.id);

  return assertZodParse(FetchHuntSessionsResponseSchema, {
    count: count ?? 0,
    data: data ?? [],
  });
}

export async function fetchAvgExpLastFive() {
  const { user, supabase } = await getUserScopedQuery();

  const { data } = await supabase.rpc("get_user_hunting_stats", {
    uid: user.id,
  });

  return data;
}
