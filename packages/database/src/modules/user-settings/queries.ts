import type { TypedSupabaseClient } from "../../types";
import type { UserID } from "../user/schemas";

type DbGetUserSettingsPayload = {
  supabase: TypedSupabaseClient;
  userId: UserID;
};

export function dbGetUserSettings({ supabase, userId }: DbGetUserSettingsPayload) {
  return supabase
    .from("user_settings")
    .select("user_id, last_active_character_id")
    .eq("user_id", userId)
    .maybeSingle();
}
