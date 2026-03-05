import type { TypedSupabaseClient } from "../../types";
import type { CharacterID } from "../characters/schemas";
import type { MonsterClass } from "../monsters";

type DbGetBestiaryClassSummaryPayload = {
  supabase: TypedSupabaseClient;
  characterId: CharacterID;
  bestiaryClass: MonsterClass;
};

export function dbGetBestiaryClassSummary({
  supabase,
  characterId,
  bestiaryClass,
}: DbGetBestiaryClassSummaryPayload) {
  return supabase
    .from("character_bestiary_class_summary")
    .select(`
      character_id,
      monster_class,
      total_monsters,
      completed_monsters,
      completed_soulpits,
      total_charm_points,
      unlocked_charm_points
    `)
    .eq("character_id", characterId)
    .eq("monster_class", bestiaryClass)
    .maybeSingle();
}
