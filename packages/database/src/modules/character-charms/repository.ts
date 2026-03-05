import type { TypedSupabaseClient } from "../../types";
import type { CharacterID } from "../characters";
import type { Charm } from "../charms";

export const CharacterCharmsRepo = {
  // Queries
  getEconomy: (supabase: TypedSupabaseClient, characterId: CharacterID) => {
    return supabase
      .from("character_charm_economy")
      .select("*")
      .eq("character_id", characterId)
      .maybeSingle();
  },

  getAll: (supabase: TypedSupabaseClient, characterId: CharacterID) => {
    return supabase
      .from("character_charms")
      .select(`character_id, charm_id, level, charm:charms(*)`)
      .eq("character_id", characterId);
  },

  // Mutations (RPCs)
  setLevel: (
    supabase: TypedSupabaseClient,
    payload: { characterId: CharacterID; charmId: Charm["id"]; level: number }
  ) => {
    return supabase.rpc("set_character_charm_level", {
      p_character_id: payload.characterId,
      p_charm_id: payload.charmId,
      p_level: payload.level,
    });
  },

  resetAll: (supabase: TypedSupabaseClient, characterId: CharacterID) => {
    return supabase.rpc("reset_all_charms", {
      p_character_id: characterId,
    });
  },
};
