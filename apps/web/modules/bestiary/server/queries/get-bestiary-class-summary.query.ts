import type { TypedSupabaseClient } from "@/core/supabase";

import type { CharacterBestiaryClassRequest } from "../../schemas";

export function getBestiaryClassSummary(
  supabase: TypedSupabaseClient,
  payload: CharacterBestiaryClassRequest
) {
  return supabase
    .from("character_bestiary_class_summary")
    .select(`
      character_id,
      bestiary_class,
      total_monsters,
      completed_monsters,
      completed_soulpits,
      total_charm_points,
      unlocked_charm_points
    `)
    .eq("character_id", payload.characterId)
    .eq("bestiary_class", payload.bestiaryClass)
    .maybeSingle();
}
