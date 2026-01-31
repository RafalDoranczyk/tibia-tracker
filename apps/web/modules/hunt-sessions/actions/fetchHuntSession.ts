"use server";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { HuntSessionDbFieldsSchema, HuntSessionSchema } from "../schemas";
import type { FetchHuntSessionPayload, HuntSession } from "../types";

const HuntSessionDbKeys = Object.keys(HuntSessionDbFieldsSchema.shape).join(", ");

const HUNT_SESSIONS_SELECT = `
  ${HuntSessionDbKeys},
  place:hunt_places!inner(id, name, image_path),
  supplies:hunt_session_supplies(
    id,
    count,
    supply:supplies(
      id,
      name, 
      image_path
    )
  ),
killed_monsters:hunt_session_killed_monsters(
  id,
  count,
  monster:monsters(
    id,
    name,
    image_path
  ),
  prey_bonus:hunt_session_prey_bonuses(
    id,
    prey:prey_bonuses(
      id,
      description,
      bonus_value,
      bonus_type
    )
  )
),
    looted_items:hunt_session_looted_items(
    id,
    count,
    item:items(
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

export async function fetchHuntSession({
  id,
  character_id,
}: FetchHuntSessionPayload): Promise<HuntSession | null> {
  const { supabase } = await getUserScopedQuery();

  const { data } = await supabase
    .from("hunt_sessions")
    .select(HUNT_SESSIONS_SELECT)
    .eq("id", id)
    .eq("character_id", character_id)
    .maybeSingle();

  if (!data) {
    return null;
  }

  return assertZodParse(HuntSessionSchema, data);
}
