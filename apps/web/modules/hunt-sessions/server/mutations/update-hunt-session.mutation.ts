import type { TypedSupabaseClient } from "@/core/supabase/types";

import type { UpdateHuntSessionPayload } from "../../schemas";

export async function updateHuntSession(
  supabase: TypedSupabaseClient,
  payload: UpdateHuntSessionPayload
) {
  return supabase.rpc("update_hunt_session", {
    p_payload: {
      session: {
        id: payload.id,
        level: payload.level,
        raw_xp_gain: payload.raw_xp_gain,
        profit: payload.profit,
        date: payload.date,
        place_id: payload.place_id,
        duration_seconds: payload.duration_seconds,
        player_count: payload.player_count,
        character_id: payload.character_id,
        xp_gain: payload.xp_gain,
        loot_value: payload.loot_value,
        supplies_cost: payload.supplies_cost,
        healing: payload.healing,
        damage: payload.damage,
        started_at: payload.started_at,
        ended_at: payload.ended_at,
      },
      killed_monsters: payload.killed_monsters,
      supplies: payload.supplies,
      damage_elements: payload.damage_elements,
      monster_damage_sources: payload.monster_damage_sources,
      looted_items: payload.looted_items,
    },
  });
}
