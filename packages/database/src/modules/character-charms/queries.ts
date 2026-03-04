import type { TypedSupabaseClient } from "../../types";
import type { CharacterID } from "../characters";

type DbGetCharacterCharmsPayload = {
  supabase: TypedSupabaseClient;
  characterId: CharacterID;
};

export function dbGetCharacterCharms({ supabase, characterId }: DbGetCharacterCharmsPayload) {
  return supabase
    .from("character_charms")
    .select(`
      character_id,
      charm_id,
      level,
      charm:charms (
        id,
        name,
        type,
        description,
        cost_lvl1,
        effect_lvl1,
        cost_lvl2,
        effect_lvl2,
        cost_lvl3,
        effect_lvl3,
        image_path
      )
    `)
    .eq("character_id", characterId);
}
