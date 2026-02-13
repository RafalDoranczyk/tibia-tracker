import type { TypedSupabaseClient } from "@/core/supabase/types";

import type { FetchHuntSessionPayload } from "../../schemas";

const SELECT = `
  id,
  character_id,
  place_id,
  date,
  started_at,
  ended_at,
  duration_seconds,
  level,
  player_count,
  created_at,
  profit,
  loot_value,
  supplies_cost,
  xp_gain,
  raw_xp_gain,
  damage,
  healing,
  xp_per_hour,
  raw_xp_per_hour,
  profit_per_hour,
  damage_per_hour,
  healing_per_hour,

  place:hunt_places!inner(id, name, image_path),

  supplies:hunt_session_supplies(
    count,
    item:items(id, name, image_path)
  ),

  killed_monsters:hunt_session_killed_monsters(
    id,
    count,
    monster:monsters(id, name, image_path),
    charm_bonus:hunt_session_charm_bonuses(
      charm:charms(id, name, image_path, type)
    ),
    prey_bonus:hunt_session_prey_bonuses(
      prey:prey_bonuses(id, description, bonus_value, bonus_type)
    )
  ),

  looted_items:hunt_session_looted_items(
    count,
    item:items(id, name, image_path)
  ),

  damage_elements:hunt_session_damage_elements(
    percent,
    damage_element:damage_elements(id, name, image_path)
  ),

  monster_damage_sources:hunt_session_monster_damage_sources(
    percent,
    damage_source:monsters(id, name, image_path)
  )
` as const;

export function getHuntSession(
  supabase: TypedSupabaseClient,
  { id, character_id }: FetchHuntSessionPayload
) {
  return supabase
    .from("hunt_sessions")
    .select(SELECT)
    .eq("id", id)
    .eq("character_id", character_id)
    .maybeSingle();
}
