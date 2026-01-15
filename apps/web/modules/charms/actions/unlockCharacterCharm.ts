"use server";

import { revalidatePath } from "next/cache";

import { PATHS } from "@/constants";
import { getUserScopedQuery } from "@/core";

import type { Charm } from "../schemas";

export async function unlockCharacterCharm({
  characterId,
  charmId,
  level,
}: { characterId: string; charmId: string; level: number }) {
  const { supabase } = await getUserScopedQuery();

  const { data: existing, error: selectError } = await supabase
    .from("character_charms")
    .select("id, level")
    .eq("character_id", characterId)
    .eq("charm_id", charmId)
    .maybeSingle();

  if (selectError) throw selectError;

  let data: Charm | null;

  if (existing) {
    const res = await supabase
      .from("character_charms")
      .update({ level })
      .eq("id", existing.id)
      .select()
      .single();
    if (res.error) throw res.error;
    data = res.data;
  } else {
    const res = await supabase
      .from("character_charms")
      .insert({ character_id: characterId, charm_id: charmId, level })
      .select()
      .single();
    if (res.error) throw res.error;
    data = res.data;
  }

  revalidatePath(PATHS.CHARACTER(characterId).CHARMS);

  return data;
}
