"use server";

import { revalidateTag } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";

import { BestiaryCacheTags } from "../cache/bestiary.tags";
import { UpdateCharacterBestiaryPayloadSchema } from "../schemas";
import { upsertCharacterBestiary } from "../server";

export async function updateCharacterBestiary(payload: unknown): Promise<void> {
  const parsed = assertZodParse(UpdateCharacterBestiaryPayloadSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();
  const { error } = await upsertCharacterBestiary(supabase, parsed);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to update character bestiary");
  }

  const { character_id, monster_id } = parsed;

  revalidateTag(BestiaryCacheTags.summary(character_id));

  const { data: monster } = await supabase
    .from("monsters")
    .select("bestiary_class")
    .eq("id", monster_id)
    .maybeSingle();

  if (monster?.bestiary_class) {
    revalidateTag(BestiaryCacheTags.classSummary(character_id, monster.bestiary_class));
  }
}
