import type { TypedSupabaseClient } from "../../types";
import type { CharacterID } from "../characters";

type DbGetCharacterCharmEconomyPayload = {
  supabase: TypedSupabaseClient;
  characterId: CharacterID;
};

export function dbGetCharacterCharmEconomy({
  supabase,
  characterId,
}: DbGetCharacterCharmEconomyPayload) {
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
