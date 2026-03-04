import type { TypedSupabaseClient } from "../../types";
import type { CharacterID } from "../characters";
import type { Charm } from "../charms";

type DbSetCharacterCharmLevelPayload = {
  supabase: TypedSupabaseClient;
  characterId: CharacterID;
  charmId: Charm["id"];
  level: number;
};

export function dbSetCharacterCharmLevelRPC({
  supabase,
  characterId,
  charmId,
  level,
}: DbSetCharacterCharmLevelPayload) {
  return supabase.rpc("set_character_charm_level", {
    p_character_id: characterId,
    p_charm_id: charmId,
    p_level: level,
  });
}

type DbResetCharacterCharmsPayload = {
  supabase: TypedSupabaseClient;
  characterId: CharacterID;
};

export function dbResetCharacterCharmsRPC({
  supabase,
  characterId,
}: DbResetCharacterCharmsPayload) {
  return supabase.rpc("reset_all_charms", {
    p_character_id: characterId,
  });
}
