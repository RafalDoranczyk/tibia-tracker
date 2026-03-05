import type { TypedSupabaseClient } from "../../types";
import type { SetupNewCharacterPayload } from "../global-characters";
import type { UserID } from "../user";
import type { CharacterID } from "./schemas";

export const CharactersRepo = {
  getById: (supabase: TypedSupabaseClient, { userId, characterId }: DbGetByIdPayload) => {
    return supabase
      .from("characters")
      .select("id, name, global_character_id")
      .eq("id", characterId)
      .eq("user_id", userId)
      .single();
  },

  getList: (supabase: TypedSupabaseClient, userId: UserID) => {
    return supabase
      .from("characters")
      .select("id, name, global_character_id")
      .order("name", { ascending: true })
      .eq("user_id", userId);
  },

  setupNew: (supabase: TypedSupabaseClient, payload: SetupNewCharacterPayload) => {
    return supabase.rpc("setup_new_character", {
      p_name: payload.name,
      p_world: payload.world,
      p_vocation: payload.vocation,
      p_user_id: payload.userId,
    });
  },

  delete: (supabase: TypedSupabaseClient, { userId, characterId }: DbDeletePayload) => {
    return supabase.from("characters").delete().eq("user_id", userId).eq("id", characterId);
  },
};

type DbGetByIdPayload = {
  userId: UserID;
  characterId: CharacterID;
};

type DbDeletePayload = {
  userId: UserID;
  characterId: CharacterID;
};
