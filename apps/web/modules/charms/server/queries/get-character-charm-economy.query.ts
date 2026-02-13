import type { TypedSupabaseClient } from "@/core/supabase/types";

export function getCharacterCharmEconomy(supabase: TypedSupabaseClient, characterId: string) {
  return supabase
    .from("character_charm_economy")
    .select(`
      character_id,
      major_unlocked,
      major_spent,
      major_available,
      minor_unlocked,
      minor_spent,
      minor_available
    `)
    .eq("character_id", characterId)
    .maybeSingle();
}
