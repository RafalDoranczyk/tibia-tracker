"use server";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";

export async function updateLastActiveCharacter(characterId: string) {
  const { supabase, userId } = await requireAuthenticatedSupabase();

  const { error } = await supabase
    .from("user_settings")
    .update({ last_active_character_id: characterId })
    .eq("user_id", userId);

  if (error) {
    throw wrapAndLogError(
      error,
      AppErrorCode.SERVER_ERROR,
      "Failed to update last active character"
    );
  }
}
