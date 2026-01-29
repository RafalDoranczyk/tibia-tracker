"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { HuntSessionDbFieldsSchema, HuntSessionSchema } from "../schemas";
import type { HuntSession } from "../types";

const HuntSessionDbKeys = Object.keys(HuntSessionDbFieldsSchema.shape).join(", ");

const HUNT_SESSIONS_SELECT = `
  ${HuntSessionDbKeys},
  place:hunt_places!inner(id, name, image_path),
  supplies:hunt_session_consumed_items(
    id,
    count,
    count_per_hour,
    supply:supplies(
      id,
      name, 
      image_path
    )
  ),
  monsters:hunt_session_monster_kills(
    id,
    count,
    monster:monsters(
      id,
      name,
      image_path
    )
  ),
  damage_elements:hunt_session_damage_elements(
    id,
    percent,
    damage_element:damage_elements(
      id,
      name,
      image_path
    )
  ),
  damage_sources:hunt_session_damage_sources(
    id,
    percent,
    damage_source:monsters(
      id,
      name,
      image_path
    )
  )
`;

export async function fetchHuntSession(sessionId: number): Promise<HuntSession | null> {
  const { supabase } = await getUserScopedQuery();

  const { data } = await supabase
    .from("hunt_sessions")
    .select(HUNT_SESSIONS_SELECT)
    .eq("id", sessionId)
    .single();

  if (!data) {
    return null;
  }

  return assertZodParse(HuntSessionSchema, data);
}
