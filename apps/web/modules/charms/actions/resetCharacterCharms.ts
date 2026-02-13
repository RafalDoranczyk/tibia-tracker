"use server";

import { revalidatePath } from "next/cache";

import { AppErrorCode, throwAndLogError } from "@/core/error";
import { PATHS } from "@/core/paths";
import { requireAuthenticatedSupabase } from "@/core/supabase/auth/guard";
import { assertZodParse } from "@/lib/zod";
import { CharacterIDSchema } from "@/modules/characters";

import { resetCharacterCharms as mutation } from "../server";

export async function resetCharacterCharms(payload: unknown): Promise<void> {
  const characterId = assertZodParse(CharacterIDSchema, payload);

  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await mutation(supabase, characterId);

  if (error) {
    throwAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to reset character charms");
  }

  revalidatePath(PATHS.CHARACTER(characterId).CHARMS);
}
