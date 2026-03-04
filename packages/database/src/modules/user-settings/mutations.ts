import type { TypedSupabaseClient } from "../../types";
import type { UserID } from "../user";

type UpdateLastActiveCharacterPayload = {
  supabase: TypedSupabaseClient;
  userId: UserID;
  characterId: string;
};

export function dbUpdateLastActiveCharacter({
  supabase,
  userId,
  characterId,
}: UpdateLastActiveCharacterPayload) {
  return supabase
    .from("user_settings")
    .update({ last_active_character_id: characterId })
    .eq("user_id", userId);
}
