"use server";

import { revalidatePath } from "next/cache";

import { PATHS } from "@/constants";
import { getUserScopedQuery } from "@/core";

export async function upgradeCharacterCharm({
  characterId,
  charmId,
}: { characterId: string; charmId: string }) {
  const { supabase } = await getUserScopedQuery();

  const { data: existing, error: fetchError } = await supabase
    .from("character_charms")
    .select("id, level")
    .eq("character_id", characterId)
    .eq("charm_id", charmId)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (!existing) throw new Error("Charm not unlocked yet");
  if (existing.level >= 3) throw new Error("Already at max level");

  const { data, error } = await supabase
    .from("character_charms")
    .update({ level: existing.level + 1 })
    .eq("id", existing.id)
    .select()
    .single();

  if (error) throw error;

  revalidatePath(PATHS.CHARACTER(characterId).CHARMS);

  return data;
}
