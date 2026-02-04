"use server";

import { getUserScopedQuery } from "@/core/supabase";

export async function updateLastActiveCharacter(characterId: string) {
  const { supabase, userId } = await getUserScopedQuery();

  await supabase
    .from("user_settings")
    .update({ last_active_character_id: characterId })
    .eq("user_id", userId);
}
