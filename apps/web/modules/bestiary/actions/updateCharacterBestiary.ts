"use server";

import { revalidateTag } from "next/cache";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { assertZodParse } from "@/utils";

import { BestiaryCacheTags } from "../cacheTags";
import { type UpdateCharacterBestiaryEntry, UpdateCharacterBestiaryEntrySchema } from "../schemas";

export async function UpdateCharacterBestiary(payload: UpdateCharacterBestiaryEntry) {
  const { characterId, monsterId, updates } = assertZodParse(
    UpdateCharacterBestiaryEntrySchema,
    payload
  );

  const { supabase } = await requireAuthenticatedSupabase();

  // Check if an entry already exists for this character and monster
  const { data: existing, error: selectError } = await supabase
    .from("character_bestiary")
    .select("id")
    .eq("character_id", characterId)
    .eq("monster_id", monsterId)
    .maybeSingle();

  if (selectError) {
    throw wrapAndLogError(
      selectError,
      AppErrorCode.SERVER_ERROR,
      "Failed to fetch character bestiary entry"
    );
  }

  // If an entry exists, update it. Otherwise, create a new one.
  if (existing) {
    const { error } = await supabase
      .from("character_bestiary")
      .update(updates)
      .eq("character_id", characterId)
      .eq("monster_id", monsterId);

    if (error) {
      throw wrapAndLogError(
        error,
        AppErrorCode.SERVER_ERROR,
        "Failed to update character bestiary entry"
      );
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
      throw wrapAndLogError(
        error,
        AppErrorCode.SERVER_ERROR,
        "Failed to create character bestiary entry"
      );
    }
  }

  // Revalidate the bestiary summary for this character and monster class (if applicable)
  const { data: monster, error: monsterError } = await supabase
    .from("monsters")
    .select("bestiary_class")
    .eq("id", monsterId)
    .maybeSingle();

  if (monsterError) {
    throw wrapAndLogError(
      monsterError,
      AppErrorCode.SERVER_ERROR,
      "Failed to resolve monster bestiary class"
    );
  }

  if (monster?.bestiary_class) {
    revalidateTag(BestiaryCacheTags.classSummary(characterId, monster.bestiary_class));
  }

  revalidateTag(BestiaryCacheTags.summary(characterId));
}
