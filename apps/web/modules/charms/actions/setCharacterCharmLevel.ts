"use server";

import { revalidatePath } from "next/cache";

import { PATHS } from "@/constants";
import { getUserScopedQuery } from "@/core";
import { assertZodParse } from "@/utils";

import { CHARM_MAX_LEVEL } from "../constants";
import { CharacterCharmUpsertPayloadSchema } from "../schemas";

export async function setCharacterCharmLevel(payload: unknown) {
  const { characterId, charmId, level } = assertZodParse(
    CharacterCharmUpsertPayloadSchema,
    payload
  );

  if (level < 1 || level > CHARM_MAX_LEVEL) {
    throw new Error("Invalid charm level");
  }

  const { supabase } = await getUserScopedQuery();

  // Call RPC (DB does ALL economy validation)
  const { error } = await supabase.rpc("unlock_charm", {
    p_character_id: characterId,
    p_charm_id: charmId,
    p_level: level,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(PATHS.CHARACTER(characterId).CHARMS);
}
