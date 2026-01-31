"use server";

import { revalidatePath } from "next/cache";

import { getUserScopedQuery } from "@/core/supabase";
import { CharacterIDSchema } from "@/modules/characters";
import { PATHS } from "@/paths";
import { assertZodParse } from "@/utils/validation/assertZodParse";

export async function resetCharacterCharms(characterId: unknown): Promise<void> {
  const parsedCharacterId = assertZodParse(CharacterIDSchema, characterId);

  const { supabase } = await getUserScopedQuery();

  const { error } = await supabase.rpc("reset_all_charms", {
    p_character_id: parsedCharacterId,
  });

  if (error) {
    throw new Error("Failed to reset character charms");
  }

  revalidatePath(PATHS.CHARACTER(parsedCharacterId).CHARMS);
}
