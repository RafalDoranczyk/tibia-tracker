"use server";

import { revalidatePath } from "next/cache";

import { PATHS } from "@/constants";
import { getUserScopedQuery } from "@/core";

export async function resetCharacterCharms(characterId: string) {
  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase.rpc("reset_all_charms", {
    p_character_id: characterId,
  });

  if (error) {
    throw new Error("Failed to reset character charms");
  }

  revalidatePath(PATHS.CHARACTER(characterId).CHARMS);
}
