"use server";

import { revalidateTag } from "next/cache";

import { getUserScopedQuery } from "@/core";

import { BestiaryCacheTags } from "../cacheTags";
import type { MonsterWithCharacterProgress } from "../types";

type UpdateCharacterBestiaryInput = {
  characterId: string;
  monsterId: number;
  updates: Partial<MonsterWithCharacterProgress>;
};

export async function updateCharacterBestiaryEntry({
  characterId,
  monsterId,
  updates,
}: UpdateCharacterBestiaryInput) {
  const { supabase } = await getUserScopedQuery();

  const { data: existing, error: selectError } = await supabase
    .from("character_bestiary")
    .select("id")
    .eq("character_id", characterId)
    .eq("monster_id", monsterId)
    .maybeSingle();

  if (selectError) throw new Error(selectError.message);

  if (existing) {
    const { error: updateError } = await supabase
      .from("character_bestiary")
      .update(updates)
      .eq("character_id", characterId)
      .eq("monster_id", monsterId);

    if (updateError) throw new Error(updateError.message);
  } else {
    const { error: insertError } = await supabase.from("character_bestiary").insert([
      {
        character_id: characterId,
        monster_id: monsterId,
        kills: updates.kills ?? 0,
        stage: updates.stage ?? 0,
        has_soul: updates.has_soul ?? false,
      },
    ]);

    if (insertError) throw new Error(insertError.message);
  }

  const { data: monster, error: monsterError } = await supabase
    .from("monsters")
    .select("bestiary_class")
    .eq("id", monsterId)
    .maybeSingle();

  if (monsterError) throw new Error(monsterError.message);

  if (monster?.bestiary_class) {
    revalidateTag(BestiaryCacheTags.classSummary(characterId, monster.bestiary_class));
  }

  revalidateTag(BestiaryCacheTags.summary(characterId));
}
