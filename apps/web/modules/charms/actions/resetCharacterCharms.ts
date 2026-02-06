"use server";

import { revalidatePath } from "next/cache";

import { AppErrorCode, wrapAndLogError } from "@/core/error";
import { requireAuthenticatedSupabase } from "@/core/supabase";
import { CharacterIDSchema } from "@/modules/characters";
import { PATHS } from "@/paths";
import { assertZodParse } from "@/utils";

export async function resetCharacterCharms(characterId: unknown): Promise<void> {
  const parsedCharacterId = assertZodParse(CharacterIDSchema, characterId);

  const { supabase } = await requireAuthenticatedSupabase();

  const { error } = await supabase.rpc("reset_all_charms", {
    p_character_id: parsedCharacterId,
  });

  if (error) {
    throw wrapAndLogError(error, AppErrorCode.SERVER_ERROR, "Failed to reset character charms");
  }

  revalidatePath(PATHS.CHARACTER(parsedCharacterId).CHARMS);
}
