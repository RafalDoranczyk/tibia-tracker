"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { type HuntSession, HuntSessionSchema } from "../schemas";

export async function fetchHuntSessionById(sessionId: string): Promise<HuntSession | null> {
  const { user, supabase } = await getUserScopedQuery();

  const { data } = await supabase
    .from("hunt_sessions")
    .select(
      `
      id,
      user_id,
      player_count,
      level,
      balance,
      raw_xp_gain,
      date,
      minutes,
      exp_per_hour,
      profit_per_hour,
      place:hunting_places!inner(
        id,
        name,
        user_id,
        image_url
      )
      `
    )
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .single();

  if (!data) {
    return null;
  }

  return assertZodParse(HuntSessionSchema, data);
}
