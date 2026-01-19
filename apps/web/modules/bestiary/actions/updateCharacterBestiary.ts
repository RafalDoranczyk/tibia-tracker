"use server";

import { revalidateTag } from "next/cache";

import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { BestiaryCacheTags } from "../cacheTags";
import { UpdateCharacterBestiaryEntrySchema } from "../schemas";

export async function UpdateCharacterBestiary(input: unknown) {
  const { characterId, monsterId, updates } = assertZodParse(
    UpdateCharacterBestiaryEntrySchema,
    input
  );

  const { supabase } = await getUserScopedQuery();

  const { data: existing, error: selectError } = await supabase
    .from("character_bestiary")
    .select("id")
    .eq("character_id", characterId)
    .eq("monster_id", monsterId)
    .maybeSingle();

  if (selectError) {
    throw new Error("Failed to fetch character bestiary entry");
  }

  if (existing) {
    const { error } = await supabase
      .from("character_bestiary")
      .update(updates)
      .eq("character_id", characterId)
      .eq("monster_id", monsterId);

    if (error) {
      throw new Error("Failed to update character bestiary entry");
    }
  } else {
    const { error } = await supabase.from("character_bestiary").insert([
      {
        character_id: characterId,
        monster_id: monsterId,
        kills: updates.kills ?? 0,
        stage: updates.stage ?? 0,
        has_soul: updates.has_soul ?? false,
      },
    ]);

    if (error) {
      throw new Error("Failed to create character bestiary entry");
    }
  }

  const { data: monster, error: monsterError } = await supabase
    .from("monsters")
    .select("bestiary_class")
    .eq("id", monsterId)
    .maybeSingle();

  if (monsterError) {
    throw new Error("Failed to resolve monster bestiary class");
  }

  if (monster?.bestiary_class) {
    revalidateTag(BestiaryCacheTags.classSummary(characterId, monster.bestiary_class));
  }

  revalidateTag(BestiaryCacheTags.summary(characterId));
}
