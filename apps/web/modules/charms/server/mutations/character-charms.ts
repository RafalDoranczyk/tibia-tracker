import type { TypedSupabaseClient } from "@/core/supabase/types";

import type { Charm, CharmLevel } from "../../schemas";

export function dbSetCharacterCharmLevel(
  supabase: TypedSupabaseClient,
  p_character_id: string,
  p_charm_id: Charm["id"],
  p_level: CharmLevel
) {
  // Call RPC (DB does ALL economy validation)
  return supabase.rpc("set_character_charm", {
    p_character_id,
    p_charm_id,
    p_level,
  });
}

export function dbResetCharacterCharms(supabase: TypedSupabaseClient, p_character_id: string) {
  return supabase.rpc("reset_all_charms", {
    p_character_id,
  });
}
