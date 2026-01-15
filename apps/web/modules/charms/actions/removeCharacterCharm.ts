"use server";

import { revalidatePath } from "next/cache";

import { PATHS } from "@/constants";
import { getUserScopedQuery } from "@/core";

export async function removeCharacterCharm({
  characterId,
  charmId,
}: { characterId: string; charmId: string }) {
  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase
    .from("character_charms")
    .delete()
    .eq("character_id", characterId)
    .eq("charm_id", charmId);

  revalidatePath(PATHS.CHARACTER(characterId).CHARMS);

  if (error) throw error;
}
