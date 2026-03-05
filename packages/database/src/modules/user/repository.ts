import type { TypedSupabaseClient } from "../../types";
import type { UserID } from "./schemas";

export const UserRepo = {
  // --- Roles ---
  getRole: (supabase: TypedSupabaseClient, userId: UserID) => {
    return supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle();
  },

  // --- Settings ---
  getSettings: (supabase: TypedSupabaseClient, userId: UserID) => {
    return supabase
      .from("user_settings")
      .select("user_id, last_active_character_id")
      .eq("user_id", userId)
      .maybeSingle();
  },

  updateLastActiveCharacter: (
    supabase: TypedSupabaseClient,
    { userId, characterId }: DbUpdateActiveCharacterPayload
  ) => {
    return supabase
      .from("user_settings")
      .update({ last_active_character_id: characterId })
      .eq("user_id", userId);
  },
};

// --- Payloads ---

type DbUpdateActiveCharacterPayload = { userId: UserID; characterId: string };
